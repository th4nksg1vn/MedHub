import OrgSignupForm from '../../../components/OrgSignupForm';

export const metadata = {
  title: 'Organization Signup',
};

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organization Signup</h1>
      <p className="mb-6">Create an organization. An admin will review and approve your request.</p>
      <OrgSignupForm />
    </main>
  );
}
