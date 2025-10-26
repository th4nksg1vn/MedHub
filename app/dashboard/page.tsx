export const metadata = { title: 'Dashboard' };

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organization Dashboard</h1>
      <p className="mb-4">Overview and quick actions (patients, staff, exports).</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">Patients: <strong>--</strong></div>
        <div className="p-4 border rounded">Staff: <strong>--</strong></div>
        <div className="p-4 border rounded">Exports: <strong>--</strong></div>
      </div>
    </main>
  );
}
