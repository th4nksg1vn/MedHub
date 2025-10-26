import { NextRequest, NextResponse } from 'next/server';
import serverSupabase from '../../../../lib/supabaseClient';
import { anonymizePatient } from '../../../../lib/anonymize';
import { getAuthUser, requireAuthOr401 } from '../../../../lib/auth';
import { assertUserHasRole } from '../../../../lib/roles';

function toCsv(rows: string[][]) {
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const orgId = url.searchParams.get('orgId');
  const anonymize = url.searchParams.get('anonymize') !== 'false';

  if (!orgId) return NextResponse.json({ error: 'orgId required' }, { status: 400 });

  // authenticate
  let authUser = null;
  try {
    authUser = await getAuthUser(req);
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 401 });
  }
  const early = requireAuthOr401(authUser);
  if (early) return early;

  // allow only requests for the same org (or internal admin key - quick check)
  const internalKey = req.headers.get('x-internal-admin-key') || process.env.INTERNAL_ADMIN_API_KEY;
  const providedInternal = req.headers.get('x-internal-admin-key');
  if (!(authUser!.orgId === orgId) && providedInternal !== internalKey) {
    return NextResponse.json({ error: 'Forbidden (org mismatch)' }, { status: 403 });
  }

  // Require role: org_admin or analyst for exports
  const allowed = await assertUserHasRole(authUser!.externalUserId, orgId, ['org_admin', 'analyst']);
  if (!allowed && providedInternal !== internalKey) {
    return NextResponse.json({ error: 'Forbidden - requires org_admin or analyst' }, { status: 403 });
  }

  const { data: patients, error } = await serverSupabase
    .from('patients')
    .select('*')
    .eq('organization_id', orgId)
    .limit(1000);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows: string[][] = [];
  // header
  rows.push(['id', 'external_patient_id', 'first_name', 'last_name', 'dob', 'gender', 'height_cm', 'weight_kg', 'bmi', 'created_at']);

  for (const p of patients || []) {
    const out = anonymize ? anonymizePatient(orgId, p) : p;
    rows.push([
      out.id,
      out.external_patient_id || '',
      out.first_name || '',
      out.last_name || '',
      out.dob || '',
      out.gender || '',
      out.height_cm ?? '',
      out.weight_kg ?? '',
      out.bmi ?? '',
      out.created_at || '',
    ]);
  }

  const csv = toCsv(rows);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="patients_${orgId}.csv"`,
    },
  });
}
