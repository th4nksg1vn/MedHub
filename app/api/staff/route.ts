import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../lib/supabaseClient';

// Staff management endpoints (dev-mode header auth)
function getUserFromReq(req: NextRequest) {
  const externalUserId = req.headers.get('x-external-user-id') || undefined;
  const orgId = req.headers.get('x-org-id') || undefined;
  if (!externalUserId || !orgId) return null;
  return { externalUserId, orgId };
}

import { getAuthUser, requireAuthOr401 } from '../../../lib/auth';
import { assertUserHasRole } from '../../../lib/roles';

export async function GET(req: NextRequest) {
  let authUser = null;
  try {
    authUser = await getAuthUser(req);
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 401 });
  }
  const early = requireAuthOr401(authUser);
  if (early) return early;

  // only org_admins should list/manage staff
  const allowed = await assertUserHasRole(authUser!.externalUserId, authUser!.orgId || '', ['org_admin']);
  if (!allowed) return NextResponse.json({ error: 'Forbidden - requires org_admin' }, { status: 403 });

  const { data, error } = await serverSupabase
    .from('organization_staff')
    .select('*')
    .eq('organization_id', authUser!.orgId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  let authUser = null;
  try {
    authUser = await getAuthUser(req);
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 401 });
  }
  const early = requireAuthOr401(authUser);
  if (early) return early;

  // only org_admins can invite/upsert staff
  const allowedInvite = await assertUserHasRole(authUser!.externalUserId, authUser!.orgId || '', ['org_admin']);
  if (!allowedInvite) return NextResponse.json({ error: 'Forbidden - requires org_admin' }, { status: 403 });

  const body = await req.json();
  // For invite flow we require an email and role. If you want to link an existing external user id,
  // call a different endpoint or include external_user_id (optional).
  if (!body.email || !body.role) {
    return NextResponse.json({ error: 'email and role required' }, { status: 400 });
  }

  const insert = {
    organization_id: authUser!.orgId,
    external_user_id: body.external_user_id || null,
    email: body.email || null,
    role: body.role,
    invited_by: authUser!.externalUserId,
    active: false, // invite pending until accepted
  };

  const { data, error } = await serverSupabase
    .from('organization_staff')
    .upsert([insert], { onConflict: 'organization_id,external_user_id' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // generate invite token and return it (dev mode - in prod, send email)
  try {
    const { signInvite } = await import('../../../lib/invite');
    const token = signInvite({ organization_id: insert.organization_id, role: insert.role, email: insert.email, invited_by: insert.invited_by });
    // write audit log
    try {
      const { logAudit } = await import('../../../lib/audit');
      await logAudit({ organization_id: authUser!.orgId, user_id: authUser!.externalUserId, action: 'invite_staff', target_table: 'organization_staff', target_id: data?.id, details: { invite_email: insert.email } });
    } catch (e) {
      console.error('audit log failed', e);
    }
    return NextResponse.json({ invite_token: token, staff: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
