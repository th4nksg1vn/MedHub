"use client";
import { useState } from 'react';
import { authFetch } from '../lib/clientAuth';
import { useToasts } from './ToastProvider';

export default function PatientForm({ onCreated }: { onCreated?: () => void }) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Creating...');
    const { push } = useToasts();
    try {
      const res = await authFetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: first, last_name: last, dob }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed');
      setStatus('Created');
      push({ title: 'Patient created', description: `${first} ${last}`, variant: 'success' });
      setFirst(''); setLast(''); setDob('');
      if (onCreated) onCreated();
    } catch (err: any) {
      setStatus(String(err.message || err));
      push({ title: 'Failed to create patient', description: String(err.message || err), variant: 'error' });
    }
  }

  return (
    <form onSubmit={handleCreate} className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm">First name</label>
        <input value={first} onChange={(e) => setFirst(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm">Last name</label>
        <input value={last} onChange={(e) => setLast(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm">DOB</label>
        <input value={dob} onChange={(e) => setDob(e.target.value)} placeholder="YYYY-MM-DD" className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Create Patient</button>
      </div>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
