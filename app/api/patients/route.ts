import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../lib/supabaseClient';
import { logAudit } from '../../../lib/audit';

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
  const user = getUserFromReq(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized - missing user/org headers (dev only)' }, { status: 401 });

  const { data, error } = await serverSupabase
    .from('patients')
    .select('*')
    .eq('organization_id', user.orgId)
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const user = getUserFromReq(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized - missing user/org headers (dev only)' }, { status: 401 });

  const body = await req.json();
  if (!body.first_name || !body.last_name) {
    return NextResponse.json({ error: 'first_name and last_name required' }, { status: 400 });
  }

  const insert = {
    organization_id: user.orgId,
    first_name: body.first_name,
    last_name: body.last_name,
    dob: body.dob || null,
    created_by: user.externalUserId,
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
        organization_id: user.orgId,
        user_id: user.externalUserId,
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
