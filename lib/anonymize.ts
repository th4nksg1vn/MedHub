import crypto from 'crypto';

const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || '';

if (!SERVICE_KEY) {
  // In dev this may be empty; production must set SUPABASE_SERVICE_ROLE_KEY
  // We'll still allow running in dev but will warn.
  // eslint-disable-next-line no-console
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY is not set. Anonymization HMAC will be weaker.');
}

export function hmacForOrg(orgId: string) {
  // Derive a per-org secret using the global service key and org id.
  return crypto.createHmac('sha256', SERVICE_KEY).update(orgId).digest();
}

export function anonymizeValue(orgId: string, value: string) {
  if (!value) return '';
  const h = crypto.createHmac('sha256', hmacForOrg(orgId));
  h.update(value);
  return h.digest('hex');
}

export function anonymizePatient(orgId: string, patient: Record<string, any>) {
  // Returns a copy with PII replaced by hashed values and stripped contact details.
  return {
    id: anonymizeValue(orgId, patient.id),
    external_patient_id: patient.external_patient_id ? anonymizeValue(orgId, String(patient.external_patient_id)) : null,
    first_name: anonymizeValue(orgId, String(patient.first_name || '')),
    last_name: anonymizeValue(orgId, String(patient.last_name || '')),
    dob: patient.dob ? patient.dob : null, // consider bucketing by age elsewhere
    gender: patient.gender || null,
    height_cm: patient.height_cm || null,
    weight_kg: patient.weight_kg || null,
    bmi: patient.bmi || null,
    allergies: patient.allergies || null,
    // Strip contact and address
    address: null,
    contact: null,
    metadata: patient.metadata || null,
    created_at: patient.created_at || null,
  };
}

export default { anonymizeValue, anonymizePatient };
