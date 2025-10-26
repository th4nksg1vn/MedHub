import { notFound } from 'next/navigation';
import PatientDetail from '../../../components/PatientDetail';

export const metadata = { title: 'Patient' };

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) notFound();

  // Render a client-side detail component that will fetch the patient info
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient {id}</h1>
      <p className="mb-4">Patient details and documents.</p>
      {/* Client component handles fetching and rendering details */}
      <PatientDetail id={id} />
    </main>
  );
}
