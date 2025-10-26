// Mock data for development

export const mockUsers = {
  patient: {
    id: '1',
    name: 'John Anderson',
    email: 'john@example.com',
    role: 'patient' as const,
    avatar: 'JD'
  },
  doctor: {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@hospital.com',
    role: 'doctor' as const,
    avatar: 'SJ',
    specialty: 'Administrator'
  },
  admin: {
    id: '3',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin' as const,
    avatar: 'AU'
  }
};

export const mockPatients = [
  { id: 'P-2024-001', name: 'John Anderson', lastVisit: 'Today, 2:30 PM', status: 'Stable', statusColor: 'bg-green-100 text-green-800' },
  { id: 'P-2024-002', name: 'Sarah Williams', lastVisit: 'Today, 1:15 PM', status: 'Recovering', statusColor: 'bg-blue-100 text-blue-800' },
  { id: 'P-2024-003', name: 'Michael Brown', lastVisit: 'Yesterday, 4:45 PM', status: 'Critical', statusColor: 'bg-red-100 text-red-800' },
  { id: 'P-2024-004', name: 'Lisa Davis', lastVisit: 'Yesterday, 11:20 AM', status: 'Stable', statusColor: 'bg-green-100 text-green-800' },
];

export const mockStaff = [
  { name: 'Dr. Michael Chen', specialty: 'Cardiologist', ext: '2341', status: 'Available', statusColor: 'bg-green-100 text-green-800' },
  { name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', ext: '2156', status: 'In Surgery', statusColor: 'bg-yellow-100 text-yellow-800' },
  { name: 'Nurse Jennifer Adams', specialty: 'ICU Specialist', ext: '2789', status: 'Available', statusColor: 'bg-green-100 text-green-800' },
  { name: 'Dr. Robert Kim', specialty: 'Orthopedic Surgeon', ext: '2445', status: 'With Patient', statusColor: 'bg-orange-100 text-orange-800' }
];

export const mockChartData = {
  patientVisits: {
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
  },
  departmentDistribution: {
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
  }
};

