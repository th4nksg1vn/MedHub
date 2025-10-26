# API Contracts (Frontend / Backend integration)

All requests and responses below are JSON unless otherwise noted. These are the minimal contracts the frontend will use during the first sprint.

## Auth
- Header: `Authorization: Bearer <JWT>` (preferred) OR dev headers for local testing:
  - `x-external-user-id`: developer user id
  - `x-org-id`: organization uuid

## POST /api/orgs/signup
Create a pending organization and owner staff entry (inactive owner until approved).

Request body:
{
  "name": "Demo Clinic",
  "type": "Clinic",
  "contact_email": "admin@demo.local",
  "contact_phone": "",
  "services": ["ECG", "X-ray"],
  "admin_external_user_id": "user-1",
  "admin_email": "admin@demo.local"
}

Response (201):
{
  "organization_id": "uuid",
  "status": "pending",
  "invite_token": "(dev-only)"
}

## GET /api/orgs/pending
Auth: INTERNAL ADMIN (use INTERNAL_ADMIN_API_KEY or admin JWT)

Response (200):
[
  { "id": "uuid", "name": "Demo Clinic", "contact_email": "admin@demo.local", "created_at": "..." },
  ...
]

## POST /api/orgs/approve
Auth: INTERNAL ADMIN

Request body:
{ "organization_id": "uuid" }

Response (200): updated organization object

## POST /api/staff/invite
Auth: org_admin

Request body:
{ "organization_id": "uuid", "email": "u2@example.com", "role": "medical_staff" }

Response (201):
{ "invite_token": "(dev-only)" }

## POST /api/staff/accept-invite
Request body:
{ "invite_token": "...", "external_user_id": "user-2" }

Response (200): activated staff object

## Patients
GET /api/patients
Headers: dev headers or Authorization
Response: list of patients for org

POST /api/patients
Body: { first_name, last_name, dob?, metadata? }
Response: created patient

## Export
GET /api/exports/patients?orgId=<orgId>&format=csv
Headers: org admin
Response: text/csv (anonymized by default)
