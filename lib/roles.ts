import serverSupabase from './supabaseClient';

export async function getUserRoleForOrg(externalUserId: string, orgId: string) {
  const { data, error } = await serverSupabase
    .from('organization_staff')
    .select('role,active')
    .eq('organization_id', orgId)
    .eq('external_user_id', externalUserId)
    .limit(1)
    .single();

  if (error) {
    // treat as no role
    return null;
  }
  if (!data || !data.active) return null;
  return data.role as string;
}

export async function assertUserHasRole(externalUserId: string, orgId: string, allowedRoles: string[]) {
  const role = await getUserRoleForOrg(externalUserId, orgId);
  if (!role) return false;
  return allowedRoles.includes(role);
}

export default { getUserRoleForOrg, assertUserHasRole };
