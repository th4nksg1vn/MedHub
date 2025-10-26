"use client";
import { useState, useEffect } from 'react';
import { authFetch } from '../lib/clientAuth';
import { useToasts } from './ToastProvider';

type Me = { user?: any; staff?: { role?: string; active?: boolean } | null };


export default function InviteForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('medical_staff');
  const [status, setStatus] = useState<string | null>(null);

  const { push } = useToasts();

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending invite...');
    try {
      const res = await authFetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed to invite');
      setStatus(j.message || j.invite_token ? 'Invite created' : 'Invite response received');
      push({ title: 'Invite created', description: email, variant: 'success' });
    } catch (err: any) {
      const msg = String(err.message || err);
      setStatus(msg);
      push({ title: 'Invite failed', description: msg, variant: 'error' });
    }
  }

  // role guard: hide invite form if not org_admin
  const [me, setMe] = useState<Me | null>(null);
  useEffect(() => {
    let mounted = true;
    authFetch('/api/me')
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setMe(data || null);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const isAdmin = me?.staff?.role === 'org_admin';
  if (me === null) {
    // still loading me data
    return <div>Loading...</div>;
  }
  if (!isAdmin) {
    return <div className="text-sm text-gray-600">You do not have permission to invite staff.</div>;
  }

  return (
    <form onSubmit={handleInvite} className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="invitee@example.com" />
      </div>
      <div>
        <label className="block text-sm">Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full border rounded p-2">
          <option value="medical_staff">Medical Staff</option>
          <option value="org_admin">Org Admin</option>
          <option value="analyst">Analyst</option>
        </select>
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Send Invite</button>
      </div>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
