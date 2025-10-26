"use client";
import React, { useEffect, useState } from 'react';
import { authFetch } from '../lib/clientAuth';

type Patient = { id: string; first_name?: string; last_name?: string; dob?: string };

export default function PatientDetail({ id }: { id: string }) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await authFetch('/api/patients');
        const data = await res.json();
        if (!mounted) return;
        const p = Array.isArray(data) ? data.find((x: any) => String(x.id) === String(id)) : null;
        setPatient(p || null);
      } catch (err) {
        console.error('patient detail load error', err);
        setPatient(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div>Loading patient...</div>;
  if (!patient) return <div className="p-4 border rounded">Patient not found.</div>;

  return (
    <div className="p-4 bg-white border rounded max-w-xl">
      <h2 className="text-xl font-semibold mb-2">{patient.first_name} {patient.last_name}</h2>
      <div className="text-sm text-gray-600 mb-2">ID: <span className="font-mono text-xs">{patient.id}</span></div>
      <div className="mb-2">DOB: {patient.dob || '—'}</div>
      <div className="mt-4">
        <button onClick={() => (window.location.href = '/patients')} className="px-3 py-1 bg-gray-200 rounded">Back to patients</button>
      </div>
    </div>
  );
}
