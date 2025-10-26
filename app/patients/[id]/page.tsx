import { notFound } from 'next/navigation';

export const metadata = { title: 'Patient' };

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) notFound();

  // placeholder: fetch patient details server-side if needed
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient {id}</h1>
      <p className="mb-4">Patient details and documents (skeleton).</p>
    </main>
  );
}
