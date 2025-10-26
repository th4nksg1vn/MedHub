import AcceptInviteForm from '../../components/AcceptInviteForm';

export const metadata = { title: 'Accept Invite' };

export default function Page({ searchParams }: { searchParams?: { token?: string } }) {
  const token = (searchParams && searchParams.token) || '';
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accept Invite</h1>
      <p className="mb-4">Open the link we emailed you and enter your external auth user id to accept the invite.</p>
      <AcceptInviteForm token={token} />
    </main>
  );
}
