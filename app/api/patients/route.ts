import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../lib/supabaseClient';
import { logAudit } from '../../../lib/audit';
import { getAuthUser, requireAuthOr401 } from '../../../lib/auth';
import { assertUserHasRole } from '../../../lib/roles';

// App Router route handler for patients (GET list, POST create)
// Dev note: this accepts headers `x-external-user-id` and `x-org-id` for
// local testing. Replace with proper JWT validation in production.

function getUserFromReq(req: NextRequest) {
  const externalUserId = req.headers.get('x-external-user-id') || undefined;
  const orgId = req.headers.get('x-org-id') || undefined;
  if (!externalUserId || !orgId) return null;
  return { externalUserId, orgId };
}

export async function GET(req: NextRequest) {
  // authenticate request
  let authUser = null;
  try {
    authUser = await getAuthUser(req);
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 401 });
  }
  const early = requireAuthOr401(authUser);
  if (early) return early;

  const user = { externalUserId: authUser!.externalUserId, orgId: authUser!.orgId } as any;

  const { data, error } = await serverSupabase
    .from('patients')
    .select('*')
    .eq('organization_id', user.orgId)
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  // authenticate request
  let authUser2 = null;
  try {
    authUser2 = await getAuthUser(req);
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 401 });
  }
  const early2 = requireAuthOr401(authUser2);
  if (early2) return early2;

  const user2 = { externalUserId: authUser2!.externalUserId, orgId: authUser2!.orgId } as any;

  const body = await req.json();
  if (!body.first_name || !body.last_name) {
    return NextResponse.json({ error: 'first_name and last_name required' }, { status: 400 });
  }

  // Only users with roles org_admin or medical_staff can create patients
  const allowed = await assertUserHasRole(user2.externalUserId, user2.orgId || '', ['org_admin', 'medical_staff']);
  if (!allowed) return NextResponse.json({ error: 'Forbidden - requires medical_staff or org_admin' }, { status: 403 });

  const insert = {
  organization_id: user2.orgId,
    first_name: body.first_name,
    last_name: body.last_name,
    dob: body.dob || null,
    created_by: user2.externalUserId,
    metadata: body.metadata || {}
  };

  const { data, error } = await serverSupabase
    .from('patients')
    .insert([insert])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
    // Write audit log for create
    try {
      await logAudit({
    organization_id: user2.orgId,
    user_id: user2.externalUserId,
        action: 'create_patient',
        target_table: 'patients',
        target_id: data?.id,
        details: { first_name: insert.first_name, last_name: insert.last_name },
      });
    } catch (err) {
      // non-fatal for the request
      console.error('audit log error', err);
    }

    return NextResponse.json(data, { status: 201 });
}
