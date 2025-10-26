'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuth = pathname?.startsWith('/signin') || pathname?.startsWith('/signup');

  if (isDashboard || isAuth) {
    // Full-screen layouts (dashboards and auth pages)
    return <>{children}</>;
  }

  // Regular pages with navigation
  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </>
  );
}

