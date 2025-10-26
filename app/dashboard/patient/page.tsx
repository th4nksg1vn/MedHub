'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Clock, FileText, Heart, User, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      
      // Mock patient data - in production, fetch from database based on logged-in user
      if (parsed.email === 'john.anderson@medihub.com') {
        setPatientData({
          name: 'John Anderson',
          id: '123456',
          email: 'john.anderson@medihub.com',
          phone: '+233 24 123 4567',
          ghanaCardId: 'GHA-123456789-0',
          condition: 'Acute Tonsillitis',
          status: 'Stable',
          admitted: '12/12/2023',
          doctor: 'Dr. John Doe',
          specialty: 'Internal Medicine',
          insurance: 'PharmaSure Company',
          policyId: '123456',
          room: '205',
          roomStatus: 'Available',
          allergies: 'No known allergies',
          vitals: {
            bloodPressure: '120/80 mmHg',
            heartRate: '72 bpm',
            weight: '70 kg',
            bloodGlucose: '95 mg/dL'
          }
        });
      }
    }
  }, []);

  if (!patientData) {
    return (
      <DashboardLayout userRole="patient">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your records...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="patient">
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Medical Records</h2>
            <p className="text-gray-600 mt-1">Welcome {patientData.name}, here are your health records</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Upcoming Appointments</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Visits</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Medical Records</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold">{patientData.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{patientData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{patientData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Ghana Card ID</p>
                  <p className="font-semibold">{patientData.ghanaCardId}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Current Condition</p>
                  <p className="font-semibold">{patientData.condition}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Admitted Date</p>
                  <p className="font-semibold">{patientData.admitted}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Health Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Blood Pressure</p>
                    <p className="font-semibold">{patientData.vitals.bloodPressure}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Heart Rate</p>
                    <p className="font-semibold">{patientData.vitals.heartRate}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-semibold">{patientData.vitals.weight}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Blood Glucose</p>
                    <p className="font-semibold">{patientData.vitals.bloodGlucose}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Primary Doctor</p>
                <p className="font-semibold text-blue-600">{patientData.doctor}</p>
                <p className="text-sm text-gray-600">{patientData.specialty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Number</p>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {patientData.room} - {patientData.roomStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Allergies</p>
                <p className="font-semibold">{patientData.allergies}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Insurance</p>
                <p className="font-semibold">{patientData.insurance}</p>
                <p className="text-sm text-gray-600">Policy ID: {patientData.policyId}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
