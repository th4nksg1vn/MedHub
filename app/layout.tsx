import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import ClientProviders from '../components/ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Medihub',
  description: 'Organization-focused health data platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {/* Inline script to remove unexpected attributes injected by browser extensions
            (e.g. `crxlauncher`) before React hydration to avoid hydration mismatch errors.
            Keep this minimal and targeted to avoid interfering with legitimate attributes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{(function(){const el=document.documentElement; if(!el) return; for(const a of Array.from(el.attributes)){ if(/^crx/i.test(a.name)){ el.removeAttribute(a.name); } }})();}catch(e){}`,
          }}
        />
        <Nav />
        <ClientProviders>
          <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}
