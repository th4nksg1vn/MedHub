import PatientList from '../../components/PatientList';
import PatientForm from '../../components/PatientForm';

export const metadata = { title: 'Patients' };

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <p className="mb-4">Patient list and creation flow.</p>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white border rounded">
          <h2 className="font-semibold mb-2">New Patient</h2>
          <PatientForm />
        </div>
        <div className="p-4 bg-white border rounded">
          <h2 className="font-semibold mb-2">Patient List</h2>
          <PatientList />
        </div>
      </div>
    </main>
  );
}
