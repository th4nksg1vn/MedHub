"use client";
import React, { useEffect, useState } from 'react';

export default function AuditList() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // No audit API yet; attempt to fetch and gracefully handle 404/500.
        const res = await fetch('/api/admin/audit');
        if (!mounted) return;
        if (!res.ok) {
          setEvents(null);
          return;
        }
        const j = await res.json();
        setEvents(Array.isArray(j) ? j : []);
      } catch (err) {
        console.error('audit load', err);
        setEvents(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading audit events...</div>;
  if (events === null) return <div className="p-4 border rounded">Audit API unavailable. This view is a placeholder.</div>;
  if (events.length === 0) return <div className="p-4 border rounded">No audit events recorded.</div>;

  return (
    <div className="space-y-2">
      {events.map((e: any) => (
        <div key={e.id || Math.random()} className="p-2 border rounded">
          <div className="text-sm text-gray-600">{e.action} — {e.user_id}</div>
          <div className="text-xs font-mono">{e.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
