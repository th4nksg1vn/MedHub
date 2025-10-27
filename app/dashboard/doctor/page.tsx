'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Users, Calendar, Clock, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Appointment {
  id: string;
  patient: string;
  time: string;
  date: string;
  type: string;
  status: 'pending' | 'accepted' | 'completed';
  condition?: string;
  contact: string;
}

const mockAppointments: Appointment[] = [
  { id: '1', patient: 'John Anderson', time: '09:00 AM', date: 'March 15, 2024', type: 'Follow-up', status: 'accepted', condition: 'Acute Tonsillitis', contact: '+233 24 123 4567' },
  { id: '2', patient: 'Sarah Williams', time: '10:30 AM', date: 'March 15, 2024', type: 'Consultation', status: 'pending', condition: 'Hypertension', contact: '+233 24 234 5678' },
  { id: '3', patient: 'Michael Brown', time: '12:00 PM', date: 'March 15, 2024', type: 'Checkup', status: 'pending', condition: 'General Checkup', contact: '+233 24 345 6789' },
  { id: '4', patient: 'Lisa Davis', time: '02:00 PM', date: 'March 15, 2024', type: 'Follow-up', status: 'completed', condition: 'Bronchitis', contact: '+233 24 456 7890' },
  { id: '5', patient: 'Robert Johnson', time: '03:30 PM', date: 'March 15, 2024', type: 'Consultation', status: 'pending', condition: 'Diabetes Consultation', contact: '+233 24 567 8901' }
];

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [activeTab, setActiveTab] = useState<'today' | 'pending' | 'all'>('today');

  const handleAccept = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'accepted' as const } : apt
    ));
  };

  const handleReject = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const filteredAppointments = {
    today: appointments.filter(apt => apt.date === 'March 15, 2024'),
    pending: appointments.filter(apt => apt.status === 'pending'),
    all: appointments
  }[activeTab];

  return (
    <DashboardLayout userRole="doctor">
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h2>
              <p className="text-gray-600 mt-1">Manage your patients and schedule</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                SJ
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Patients</p>
                  <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Consultations</p>
                  <p className="text-3xl font-bold mt-2">{appointments.filter(a => a.status === 'pending').length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-3xl font-bold mt-2">127</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold mt-2">8</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('today')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'today'
                      ? 'border-b-2 border-blue-600 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Today's Schedule
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'pending'
                      ? 'border-b-2 border-blue-600 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'all'
                      ? 'border-b-2 border-blue-600 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  All Appointments
                </button>
              </nav>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-600 font-semibold w-24">{appointment.time}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">{appointment.date} • {appointment.type}</p>
                            {appointment.condition && (
                              <p className="text-sm text-gray-500">Condition: {appointment.condition}</p>
                            )}
                          </div>
                        </div>
                        <div className="ml-28 text-sm text-gray-600">
                          Contact: {appointment.contact}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                        {appointment.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAccept(appointment.id)}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(appointment.id)}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <p className="font-semibold">Add New Patient</p>
                  <p className="text-sm text-gray-600">Register a new patient</p>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <p className="font-semibold">Write Prescription</p>
                  <p className="text-sm text-gray-600">Create patient prescription</p>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <p className="font-semibold">View Reports</p>
                  <p className="text-sm text-gray-600">Access medical reports</p>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Patients</h3>
              <div className="space-y-3">
                {[
                  { name: 'John Anderson', visit: 'Yesterday', status: 'Stable' },
                  { name: 'Sarah Williams', visit: '2 days ago', status: 'Recovering' },
                  { name: 'Michael Brown', visit: '3 days ago', status: 'Critical' }
                ].map((patient, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">{patient.name}</p>
                      <p className="text-xs text-gray-600">Last visit: {patient.visit}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {patient.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
