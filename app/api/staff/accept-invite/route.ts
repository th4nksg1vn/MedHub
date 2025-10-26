import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { invite_token, external_user_id } = body || {};
    if (!invite_token || !external_user_id) return NextResponse.json({ error: 'invite_token and external_user_id required' }, { status: 400 });

    const { verifyInvite } = await import('../../../../lib/invite');
    let payload;
    try {
      payload = verifyInvite(invite_token);
    } catch (err: any) {
      return NextResponse.json({ error: 'Invalid or expired invite token' }, { status: 400 });
    }

    // find the invited staff row and activate it
    const updatePayload: any = { external_user_id, active: true };

    const query = serverSupabase
      .from('organization_staff')
      .update(updatePayload)
      .match({ organization_id: payload.organization_id, role: payload.role });

    // if the invite had an email, prefer matching by email
    if (payload.email) {
      query.eq('email', payload.email);
    }

    const { data, error } = await query.select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // audit
    try {
      const { logAudit } = await import('../../../../lib/audit');
      await logAudit({ organization_id: payload.organization_id, user_id: external_user_id, action: 'accept_invite', target_table: 'organization_staff', target_id: data?.id, details: { invited_by: payload.invited_by, role: payload.role } });
    } catch (e) {
      console.error('audit failed', e);
    }

    return NextResponse.json({ staff: data });
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
