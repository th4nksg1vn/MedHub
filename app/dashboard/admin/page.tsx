'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Building, Users, Bed, Stethoscope, Calendar, Plus, Search, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface Patient {
  name: string;
  id: string;
  admitted: string;
  condition: string;
  status: string;
  statusColor: string;
  allergies: string;
  doctor: string;
  specialty: string;
  contact: string;
  insurance: string;
  policyId: string;
  address: string;
  room: string;
  roomStatus: string;
  roomStatusColor: string;
}

const mockPatients: Patient[] = [
  {
    name: 'JOHN Doe',
    id: '123456',
    admitted: '12/12/2023',
    condition: 'Acute Tonsillitis',
    status: 'Stable',
    statusColor: 'bg-red-100 text-red-800',
    allergies: 'No known allergies',
    doctor: 'Dr. John Doe',
    specialty: 'Internal Medicine',
    contact: '12345',
    insurance: 'PharmaSure Company',
    policyId: '123456',
    address: '123 Main St',
    room: '205',
    roomStatus: 'Available',
    roomStatusColor: 'bg-green-100 text-green-800'
  },
  {
    name: 'SARAH Smith',
    id: '123457',
    admitted: '11/12/2023',
    condition: 'Hypertension',
    status: 'Stable',
    statusColor: 'bg-red-100 text-red-800',
    allergies: 'Penicillin',
    doctor: 'Dr. Jane Smith',
    specialty: 'Cardiology',
    contact: '23456',
    insurance: 'HealthCare Plus',
    policyId: '234567',
    address: '456 Oak Ave',
    room: '301',
    roomStatus: 'Occupied',
    roomStatusColor: 'bg-red-100 text-red-800'
  },
  {
    name: 'MIKE Johnson',
    id: '123458',
    admitted: '10/12/2023',
    condition: 'Diabetes Type 2',
    status: 'Stable',
    statusColor: 'bg-red-100 text-red-800',
    allergies: 'None',
    doctor: 'Dr. Robert Kim',
    specialty: 'Endocrinology',
    contact: '34567',
    insurance: 'MediCover Inc',
    policyId: '345678',
    address: '789 Pine Rd',
    room: '102',
    roomStatus: 'Available',
    roomStatusColor: 'bg-green-100 text-green-800'
  }
];

export default function AdminDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'doctors' | 'patients'>('patients');

  const handleCreatePatient = (formData: any) => {
    const newPatient: Patient = {
      name: formData.name.toUpperCase(),
      id: `1234${Math.floor(Math.random() * 1000)}`,
      admitted: new Date().toLocaleDateString(),
      condition: formData.condition || 'General Checkup',
      status: 'Stable',
      statusColor: 'bg-red-100 text-red-800',
      allergies: formData.allergies || 'None',
      doctor: formData.doctor || 'Dr. General',
      specialty: formData.specialty || 'General Medicine',
      contact: formData.contact || '00000',
      insurance: formData.insurance || 'Self Pay',
      policyId: formData.policyId || 'N/A',
      address: formData.address || 'N/A',
      room: formData.room || 'N/A',
      roomStatus: 'Occupied',
      roomStatusColor: 'bg-red-100 text-red-800'
    };
    setPatients([newPatient, ...patients]);
    setShowCreateModal(false);
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.includes(searchQuery)
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600 mt-1">Welcome Back! Here's what is happening at your Hospital today</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
              <p className="text-gray-200 mb-2">Total Doctors</p>
              <p className="text-4xl font-bold">245</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow">
              <p className="text-gray-200 mb-2">Total Patients</p>
              <p className="text-4xl font-bold">{patients.length}</p>
            </div>
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow">
              <p className="text-gray-200 mb-2">Available Beds</p>
              <p className="text-4xl font-bold">142</p>
            </div>
          </div>

          {/* Patient Records Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('doctors')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'doctors'
                      ? 'border-b-2 border-blue-600 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Medical Professionals
                </button>
                <button
                  onClick={() => setActiveTab('patients')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'patients'
                      ? 'border-b-2 border-blue-600 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Patients
                </button>
              </nav>
            </div>

            {activeTab === 'patients' && (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Patient Records</h3>
                      <p className="text-sm text-gray-600">Manage all patient information</p>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Add New Patient
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Roles</option>
                      <option>Stable</option>
                      <option>Critical</option>
                      <option>Recovering</option>
                    </select>
                  </div>
                </div>

                {/* Patient Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          PATIENT
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          MEDICAL INFO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          PRIMARY DOCTOR
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          INSURANCE
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROOM
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPatients.map((patient, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-bold text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">ID: {patient.id}</div>
                              <div className="text-sm text-gray-500">Admitted: {patient.admitted}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900">{patient.condition}</div>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${patient.statusColor}`}>
                                {patient.status}
                              </span>
                              <div className="text-sm text-gray-500 mt-1">Notes: {patient.allergies}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-blue-600">{patient.doctor}</div>
                              <div className="text-sm text-gray-500">{patient.specialty}</div>
                              <div className="text-sm text-gray-500">Contact: {patient.contact}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900">{patient.insurance}</div>
                              <div className="text-sm text-gray-500">Policy ID: {patient.policyId}</div>
                              <div className="text-sm text-gray-500">Address: {patient.address}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900">ROOM: {patient.room}</div>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${patient.roomStatusColor}`}>
                                {patient.roomStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Patient Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Add New Patient</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCreatePatient(Object.fromEntries(formData));
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <input
                    name="condition"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Acute Tonsillitis"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Doctor</label>
                  <input
                    name="doctor"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input
                    name="specialty"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Internal Medicine"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                  <input
                    name="insurance"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="PharmaSure Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy ID</label>
                  <input
                    name="policyId"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="123456"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                  <input
                    name="room"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="205"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                  <input
                    name="contact"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="12345"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <input
                  name="allergies"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="No known allergies"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  name="address"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Create Patient
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
