"use client";
import React, { useEffect, useState } from 'react';

type Org = {
  id: string;
  name: string;
  contact_email?: string;
  created_at?: string;
};

export default function PendingOrgsList() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/orgs/pending')
      .then((r) => r.json())
      .then((data) => setOrgs(data || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  async function approve(orgId: string) {
    setLoading(true);
    try {
      const res = await fetch('/api/orgs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organization_id: orgId }),
      });
      if (!res.ok) throw new Error('Approve failed');
      setOrgs((s) => s.filter((o) => o.id !== orgId));
    } catch (err: any) {
      setError(err.message || 'Error approving');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {orgs.length === 0 && <div>No pending organizations</div>}
      {orgs.map((org) => (
        <div key={org.id} className="flex items-center justify-between rounded border p-4">
          <div>
            <div className="font-semibold">{org.name}</div>
            <div className="text-sm text-gray-600">{org.contact_email}</div>
          </div>
          <div>
            <button onClick={() => approve(org.id)} className="rounded bg-green-600 px-3 py-1 text-white">
              Approve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
