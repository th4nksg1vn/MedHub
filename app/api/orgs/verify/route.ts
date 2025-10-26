import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../../lib/supabaseClient';
import { getAuthUser } from '../../../../lib/auth';

// Admin-only endpoint. Requires INTERNAL_ADMIN_API_KEY via header 'x-internal-admin-key'
export async function POST(req: NextRequest) {
  const provided = req.headers.get('x-internal-admin-key') || '';
  const expected = process.env.INTERNAL_ADMIN_API_KEY || '';
  if (!expected || provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized - internal admin key required' }, { status: 401 });
  }

  const body = await req.json();
  if (!body.organization_id) return NextResponse.json({ error: 'organization_id required' }, { status: 400 });

  const { data, error } = await serverSupabase
    .from('organizations')
    .update({ verified: true })
    .eq('id', body.organization_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
