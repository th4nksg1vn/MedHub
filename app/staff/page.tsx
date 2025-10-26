import InviteForm from '../../components/InviteForm';
import StaffList from '../../components/StaffList';

export const metadata = { title: 'Staff Management' };

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <p className="mb-4">Invite staff and manage roles.</p>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white border rounded">
          <h2 className="font-semibold mb-2">Invite</h2>
          <InviteForm />
        </div>
        <div className="p-4 bg-white border rounded">
          <h2 className="font-semibold mb-2">Current Staff</h2>
          <StaffList />
        </div>
      </div>
    </main>
  );
}
