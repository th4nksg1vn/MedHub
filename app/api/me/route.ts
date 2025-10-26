import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, requireAuthOr401 } from '../../../lib/auth';
import serverSupabase from '../../../lib/supabaseClient';

export async function GET(req: NextRequest) {
  let authUser = null;
  try {
    authUser = await getAuthUser(req);
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 401 });
  }
  const early = requireAuthOr401(authUser);
  if (early) return early;

  try {
    const { data, error } = await serverSupabase
      .from('organization_staff')
      .select('id,role,active,organization_id,external_user_id')
      .eq('organization_id', authUser!.orgId)
      .eq('external_user_id', authUser!.externalUserId)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ user: { external_user_id: authUser!.externalUserId, email: authUser!.email, orgId: authUser!.orgId }, staff: data || null });
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
