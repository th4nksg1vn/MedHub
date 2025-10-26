'use client';

import dynamic from 'next/dynamic';
import { Users, Calendar, Building, Bed, Stethoscope, CalendarCheck, Settings, LogOut } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
  const patientVisitsData = {
    series: [{
      name: 'Patient Visits',
      data: [120, 135, 98, 145, 132, 85, 92]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false }
      },
      colors: ['#3B82F6'],
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      markers: {
        size: 5,
        colors: ['#3B82F6']
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yaxis: {
        min: 0,
        max: 160
      },
      grid: {
        borderColor: '#E5E7EB'
      }
    }
  };

  const departmentData = {
    series: [35, 20, 18, 15, 12],
    options: {
      chart: {
        type: 'donut',
        height: 350
      },
      colors: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
      labels: ['Emergency', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Others'],
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%'
          }
        }
      }
    }
  };

  const staff = [
    { name: 'Dr. Michael Chen', specialty: 'Cardiologist', ext: '2341', status: 'Available', statusColor: 'bg-green-100 text-green-800' },
    { name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', ext: '2156', status: 'In Surgery', statusColor: 'bg-yellow-100 text-yellow-800' },
    { name: 'Nurse Jennifer Adams', specialty: 'ICU Specialist', ext: '2789', status: 'Available', statusColor: 'bg-green-100 text-green-800' },
    { name: 'Dr. Robert Kim', specialty: 'Orthopedic Surgeon', ext: '2445', status: 'With Patient', statusColor: 'bg-orange-100 text-orange-800' }
  ];

  const patients = [
    { name: 'John Anderson', id: 'P-2024-001', lastVisit: 'Today, 2:30 PM', status: 'Stable', statusColor: 'bg-green-100 text-green-800' },
    { name: 'Sarah Williams', id: 'P-2024-002', lastVisit: 'Today, 1:15 PM', status: 'Recovering', statusColor: 'bg-blue-100 text-blue-800' },
    { name: 'Michael Brown', id: 'P-2024-003', lastVisit: 'Yesterday, 4:45 PM', status: 'Critical', statusColor: 'bg-red-100 text-red-800' },
    { name: 'Lisa Davis', id: 'P-2024-004', lastVisit: 'Yesterday, 11:20 AM', status: 'Stable', statusColor: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <img 
            src="https://g9kbtbs1bu.ufs.sh/f/woziFUfAWTFp7BlfiEvRlS1GrWLQhwZMzocm87npUf63sV5v" 
            alt="Medihub Logo" 
            className="w-10 h-10" 
          />
          <h1 className="text-xl font-bold">Medihub</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg">
            <CalendarCheck className="w-5 h-5" />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
            <Calendar className="w-5 h-5" />
            <span>Appointments</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="p-4 border-t border-blue-600">
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Building className="w-8 h-8 text-blue-700" />
            <div>
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-gray-600">Welcome back! Here's what's happening at your hospital today.</p>
            </div>
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
          {/* Hospital Info Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Central Medical Hospital</h3>
                <p className="text-blue-100 mb-6">123 Healthcare Avenue, Medical District, City 12345</p>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-blue-200">24/7 Emergency Care</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">15+ Departments</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">500+ Bed Capacity</p>
                  </div>
                </div>
              </div>
              <Building className="w-32 h-32 text-blue-300 opacity-50" />
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Total Professionals</span>
              </div>
              <p className="text-3xl font-bold">245</p>
              <p className="text-sm text-green-600">+12 this month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Total Patients</span>
              </div>
              <p className="text-3xl font-bold">1,847</p>
              <p className="text-sm text-green-600">+89 this week</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">Today's Appointments</span>
              </div>
              <p className="text-3xl font-bold">127</p>
              <p className="text-sm text-yellow-600">18 pending</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <Bed className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Bed Occupancy</span>
              </div>
              <p className="text-3xl font-bold">78%</p>
              <p className="text-sm text-gray-600">392 of 500 beds</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Patient Visits (Last 7 Days)</h3>
              <Chart
                options={patientVisitsData.options}
                series={patientVisitsData.series}
                type="line"
                height={350}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Department Distribution</h3>
              <Chart
                options={departmentData.options}
                series={departmentData.series}
                type="donut"
                height={350}
              />
            </div>
          </div>

          {/* Lists */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Medical Staff</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {staff.map((person, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{person.name}</p>
                      <p className="text-xs text-gray-600">{person.specialty} • Ext: {person.ext}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${person.statusColor}`}>
                      {person.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Patients</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {patients.map((patient, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{patient.name}</p>
                      <p className="text-xs text-gray-600">ID: {patient.id} • {patient.lastVisit}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${patient.statusColor}`}>
                      {patient.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </main>
    </div>
  );
}
