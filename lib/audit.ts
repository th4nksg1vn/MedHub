import serverSupabase from './supabaseClient';

type AuditEntry = {
  organization_id?: string;
  user_id?: string;
  action: string;
  target_table?: string;
  target_id?: string;
  details?: Record<string, unknown>;
};

export async function logAudit(entry: AuditEntry) {
  try {
    const { data, error } = await serverSupabase
      .from('audit_logs')
      .insert([
        {
          organization_id: entry.organization_id || null,
          user_id: entry.user_id || null,
          action: entry.action,
          target_table: entry.target_table || null,
          target_id: entry.target_id || null,
          details: entry.details || {},
        },
      ]);

    if (error) {
      console.error('Failed to write audit log:', error.message);
      return null;
    }
    return data?.[0] ?? null;
  } catch (err) {
    console.error('Unexpected error writing audit log:', err);
    return null;
  }
}

export default logAudit;
