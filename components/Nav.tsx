'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold">Medihub</Link>
            <Link href="/dashboard" className="text-sm text-gray-600">Dashboard</Link>
            <Link href="/patients" className="text-sm text-gray-600">Patients</Link>
            <Link href="/staff" className="text-sm text-gray-600">Staff</Link>
            <Link href="/exports" className="text-sm text-gray-600">Exports</Link>
            <Link href="/settings" className="text-sm text-gray-600">Settings</Link>
          </div>
          <div>
            <Link href="/accept-invite" className="text-sm text-blue-600">Accept Invite</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
