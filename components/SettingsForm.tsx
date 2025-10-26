"use client";
import React, { useState } from 'react';
import { useToasts } from './ToastProvider';

export default function SettingsForm() {
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { push } = useToasts();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // UI-only for now: no server endpoint implemented. Simulate success.
      await new Promise((r) => setTimeout(r, 600));
      push({ title: 'Settings saved', description: 'Display name updated', variant: 'success' });
    } catch (err) {
      push({ title: 'Save failed', description: String(err), variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium">Display name</label>
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <button type="submit" disabled={submitting} className="rounded bg-blue-600 px-4 py-2 text-white">
          {submitting ? 'Saving...' : 'Save settings'}
        </button>
      </div>
    </form>
  );
}
