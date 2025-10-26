export const metadata = { title: 'Settings' };

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organization Settings</h1>
      <p className="mb-4">Manage organization settings and integrations (skeleton).</p>
      <div className="max-w-lg">
        <label className="block text-sm">Display name</label>
        <input className="mt-1 block w-full border rounded p-2" />
      </div>
    </main>
  );
}
