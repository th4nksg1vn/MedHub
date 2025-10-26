import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '../components/ConditionalLayout';
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
  // Defensive: include known extension attribute names on the server-rendered <html>
  // so browser extensions that inject the same attribute don't cause a hydration mismatch.
  // We add the attribute using a spread cast to `any` so TypeScript doesn't complain
  // about unknown props on intrinsic JSX elements.
  <html lang="en" {...({ ['crxlauncher']: '' } as any)}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        {/* Inline script to remove unexpected attributes injected by browser extensions
            (e.g. `crxlauncher`) before React hydration to avoid hydration mismatch errors.
            Keep this minimal and targeted to avoid interfering with legitimate attributes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{(function(){const el=document.documentElement; if(!el) return; for(const a of Array.from(el.attributes)){ if(/^crx/i.test(a.name)){ el.removeAttribute(a.name); } }})();}catch(e){}`,
          }}
        />
        <ConditionalLayout>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ConditionalLayout>
      </body>
    </html>
  );
}
