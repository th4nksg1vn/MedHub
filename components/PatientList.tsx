"use client";
import React, { useEffect, useState } from 'react';

type Patient = {
  id: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
};

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/patients', { headers: { 'x-external-user-id': 'dev-user', 'x-org-id': 'dev-org' } })
      .then((r) => r.json())
      .then((data) => setPatients(data || []))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading patients...</div>;

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Patients ({patients.length})</div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1 text-xs">{p.id}</td>
              <td className="border px-2 py-1">{p.first_name} {p.last_name}</td>
              <td className="border px-2 py-1">{p.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
