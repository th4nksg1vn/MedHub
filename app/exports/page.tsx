"use client";

import React from 'react';

export default function Page() {
  async function handleExport(e: React.FormEvent) {
    e.preventDefault();
    const orgId = (document.getElementById('orgId') as HTMLInputElement).value;
    const url = `/api/exports/patients?orgId=${encodeURIComponent(orgId)}&anonymize=true`;
    window.location.href = url;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exports</h1>
      <p className="mb-4">Run anonymized exports for your organization.</p>
      <form onSubmit={handleExport} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm">Organization ID</label>
          <input id="orgId" className="mt-1 block w-full border rounded p-2" placeholder="org id" />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Download CSV</button>
        </div>
      </form>
    </main>
  );
}
