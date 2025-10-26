import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../lib/supabaseClient';

// Staff management endpoints (dev-mode header auth)
function getUserFromReq(req: NextRequest) {
  const externalUserId = req.headers.get('x-external-user-id') || undefined;
  const orgId = req.headers.get('x-org-id') || undefined;
  if (!externalUserId || !orgId) return null;
  return { externalUserId, orgId };
}

export async function GET(req: NextRequest) {
  const user = getUserFromReq(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await serverSupabase
    .from('organization_staff')
    .select('*')
    .eq('organization_id', user.orgId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const user = getUserFromReq(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  if (!body.external_user_id || !body.role) {
    return NextResponse.json({ error: 'external_user_id and role required' }, { status: 400 });
  }

  const insert = {
    organization_id: user.orgId,
    external_user_id: body.external_user_id,
    email: body.email || null,
    role: body.role,
    invited_by: user.externalUserId,
    active: true,
  };

  const { data, error } = await serverSupabase
    .from('organization_staff')
    .upsert([insert], { onConflict: 'organization_id,external_user_id' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
