'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Clock, FileText, Heart } from 'lucide-react';

export default function PatientDashboard() {
  return (
    <DashboardLayout userRole="patient">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Here's your health overview</p>
        </div>
      </header>

      <div className="p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Appointments</p>
                <p className="text-3xl font-bold mt-2">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-3xl font-bold mt-2">24</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medical Records</p>
                <p className="text-3xl font-bold mt-2">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Appointments</h3>
          <div className="space-y-4">
            {[
              { date: 'March 15, 2024', doctor: 'Dr. Sarah Johnson', time: '10:00 AM', status: 'Completed' },
              { date: 'March 20, 2024', doctor: 'Dr. Michael Chen', time: '2:30 PM', status: 'Upcoming' },
              { date: 'March 25, 2024', doctor: 'Dr. Emily Rodriguez', time: '11:00 AM', status: 'Upcoming' }
            ].map((appointment, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
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
                  <p className="font-semibold">120/80 mmHg</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="font-semibold">72 bpm</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="font-semibold">70 kg</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Blood Glucose</p>
                  <p className="font-semibold">95 mg/dL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

