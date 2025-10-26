'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Users, Calendar, Clock, Activity } from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <DashboardLayout userRole="doctor">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h2>
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
      </header>

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
                <p className="text-3xl font-bold mt-2">5</p>
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

        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {[
              { time: '09:00 AM', patient: 'John Anderson', status: 'Completed' },
              { time: '10:30 AM', patient: 'Sarah Williams', status: 'In Progress' },
              { time: '12:00 PM', patient: 'Michael Brown', status: 'Upcoming' },
              { time: '02:00 PM', patient: 'Lisa Davis', status: 'Upcoming' },
              { time: '03:30 PM', patient: 'Robert Johnson', status: 'Upcoming' }
            ].map((appointment, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-blue-600 font-semibold w-24">{appointment.time}</span>
                <p className="flex-1 font-semibold">{appointment.patient}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
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
    </DashboardLayout>
  );
}

