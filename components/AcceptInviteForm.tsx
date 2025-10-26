'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { authFetch, getIdToken, parseJwt } from '../lib/clientAuth';
import { useToasts } from './ToastProvider';

export default function AcceptInviteForm({ token }: { token?: string }) {
  const [externalId, setExternalId] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  // One-click accept: if invite token present and user is logged in (id_token available), auto-accept
  useEffect(() => {
    async function tryAutoAccept() {
      if (!token) return;
      const idToken = getIdToken();
      const payload = parseJwt(idToken);
      if (payload && payload.sub) {
        setStatus('Accepting invite automatically...');
        const { push } = useToasts();
        try {
          const res = await authFetch('/api/staff/accept-invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ invite_token: token, external_user_id: payload.sub }),
          });
          const j = await res.json();
          if (!res.ok) throw new Error(j.error || 'Failed to accept invite');
          setStatus('Invite accepted — redirecting...');
          push({ title: 'Invite accepted', description: 'Welcome!', variant: 'success' });
          setTimeout(() => (window.location.href = '/dashboard'), 800);
          return;
        } catch (err: any) {
          const msg = String(err.message || err);
          setStatus(msg);
          push({ title: 'Invite accept failed', description: msg, variant: 'error' });
        }
      }
      // no id token: leave the manual form
    }
    tryAutoAccept();
  }, [token]);

  async function handleAccept(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Submitting...');
    const { push } = useToasts();
    try {
      const res = await authFetch('/api/staff/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invite_token: token, external_user_id: externalId }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed');
      setStatus('Invite accepted. Redirecting...');
      push({ title: 'Invite accepted', description: 'Welcome!', variant: 'success' });
      setTimeout(() => (window.location.href = '/dashboard'), 1000);
    } catch (err: any) {
      const msg = String(err.message || err);
      setStatus(msg);
      push({ title: 'Invite accept failed', description: msg, variant: 'error' });
    }
  }

  return (
    <form onSubmit={handleAccept} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">External User ID</label>
        <input value={externalId} onChange={(e) => setExternalId(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="Your auth provider user id" />
      </div>
      <div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Accept Invite</button>
      </div>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
