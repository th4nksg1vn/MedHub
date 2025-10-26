"use client";
import React, { useState } from 'react';

type Props = {};

export default function OrgSignupForm(_: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Clinic');
  const [contactEmail, setContactEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name || !contactEmail) return setError('Name and contact email are required');

    setSubmitting(true);
    try {
      const res = await fetch('/api/orgs/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          contact_email: contactEmail,
          admin_external_user_id: 'dev-admin',
          admin_email: contactEmail,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Signup failed');
      setSuccess('Organization created and pending approval');
      setName('');
      setContactEmail('');
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Organization name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2">
          <option>Clinic</option>
          <option>Hospital</option>
          <option>Lab</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact email</label>
        <input
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          type="email"
          className="mt-1 block w-full rounded border px-3 py-2"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-600">{success}</div>}

      <div>
        <button type="submit" disabled={submitting} className="rounded bg-blue-600 px-4 py-2 text-white">
          {submitting ? 'Submitting...' : 'Sign up organization'}
        </button>
      </div>
    </form>
  );
}
