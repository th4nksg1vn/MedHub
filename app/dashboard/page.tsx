'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard for now
    // In production, check user role from localStorage/auth
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === 'patient') {
        router.push('/dashboard/patient');
      } else if (userData.role === 'doctor') {
        router.push('/dashboard/doctor');
      } else {
        router.push('/dashboard/admin');
      }
    } else {
      router.push('/dashboard/admin');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
