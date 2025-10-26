'use client';
import { useEffect, useState } from 'react';
import { authFetch } from '../lib/clientAuth';

type Staff = { id: string; email?: string; role?: string; active?: boolean; external_user_id?: string };

export default function StaffList() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authFetch('/api/staff')
      .then((r) => r.json())
      .then((data) => setStaff(data || []))
      .catch((e) => {
        // show toast on error
        console.error('Failed to load staff', e);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading staff...</div>;

  return (
    <div>
      <div className="text-sm text-gray-600">Staff ({staff.length})</div>
      <table className="w-full table-auto mt-2">
        <thead>
          <tr>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.email}</td>
              <td className="border px-2 py-1">{s.role}</td>
              <td className="border px-2 py-1">{s.active ? 'Active' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
