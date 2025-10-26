export const metadata = { title: 'Settings' };

import SettingsForm from '../../components/SettingsForm';

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organization Settings</h1>
      <p className="mb-4">Manage organization settings and integrations.</p>
      <div className="max-w-lg bg-white border rounded p-4">
        <SettingsForm />
      </div>
    </main>
  );
}
