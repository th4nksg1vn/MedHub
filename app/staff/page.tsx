import PendingOrgsList from '../../components/PendingOrgsList';

export const metadata = { title: 'Staff Management' };

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management (Admin)</h1>
      <p className="mb-4">Invite staff and manage roles. This is a skeleton admin UI.</p>
      <PendingOrgsList />
    </main>
  );
}
