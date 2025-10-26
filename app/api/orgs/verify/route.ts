import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../../lib/supabaseClient';

// Admin endpoint to mark an organization as verified (admin-only — dev headers)
function getUserFromReq(req: NextRequest) {
  const externalUserId = req.headers.get('x-external-user-id') || undefined;
  const orgId = req.headers.get('x-org-id') || undefined;
  if (!externalUserId) return null;
  return { externalUserId, orgId };
}

export async function POST(req: NextRequest) {
  const user = getUserFromReq(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  if (!body.organization_id) return NextResponse.json({ error: 'organization_id required' }, { status: 400 });

  // In production, ensure the user has admin privileges for the org being verified.
  const { data, error } = await serverSupabase
    .from('organizations')
    .update({ verified: true })
    .eq('id', body.organization_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
