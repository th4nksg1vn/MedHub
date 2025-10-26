import PatientList from '../../components/PatientList';

export const metadata = { title: 'Patients' };

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <p className="mb-4">Patient list (skeleton). Build CRUD flows from here.</p>
      <PatientList />
    </main>
  );
}
