'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarCheck, Calendar, Users, Settings, LogOut, Building } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/signin');
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white flex flex-col fixed h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-blue-600">
          <img 
            src="https://g9kbtbs1bu.ufs.sh/f/woziFUfAWTFp7BlfiEvRlS1GrWLQhwZMzocm87npUf63sV5v" 
            alt="Medihub Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold">Medihub</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg">
            <CalendarCheck className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          
          {userRole === 'patient' && (
            <>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
                <Building className="w-5 h-5" />
                <span>My Records</span>
              </a>
            </>
          )}

          {(userRole === 'doctor' || userRole === 'admin') && (
            <>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
                <Users className="w-5 h-5" />
                <span>Patients</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </a>
            </>
          )}

          {userRole === 'admin' && (
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
              <Users className="w-5 h-5" />
              <span>Staff</span>
            </a>
          )}

          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-blue-600">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

