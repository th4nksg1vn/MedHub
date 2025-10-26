"use client";
import React, { useEffect, useState } from 'react';
import { authFetch } from '../lib/clientAuth';

export default function DashboardStats() {
  const [counts, setCounts] = useState<{ patients?: number; staff?: number }>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [pRes, sRes] = await Promise.all([
          authFetch('/api/patients').then((r) => r.json()).catch(() => []),
          authFetch('/api/staff').then((r) => r.json()).catch(() => []),
        ]);
        if (!mounted) return;
        setCounts({ patients: Array.isArray(pRes) ? pRes.length : 0, staff: Array.isArray(sRes) ? sRes.length : 0 });
      } catch (err) {
        console.error('dashboard stats error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 border rounded">Patients: <strong>{counts.patients ?? '--'}</strong></div>
      <div className="p-4 border rounded">Staff: <strong>{counts.staff ?? '--'}</strong></div>
      <div className="p-4 border rounded">Exports: <strong>--</strong></div>
    </div>
  );
}
