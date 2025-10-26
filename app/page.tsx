import Link from "next/link";
// Use public path for background images under /public
const DOCS_BG = "/assets/MedicalDocs.png";

export default function Home() {
  return (
    <div className="landing-root min-h-screen">
      <main>
        {/* HERO */}
        <section className="container py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-center md:text-left">
                  A <span className="text-[#0A5CFF]">secure</span> health data platform for builders
                </h1>
                <p className="mt-6 text-lg text-black text-center md:text-left">
                  Medihub connects hospitals, patients and researchers with secure, consent-driven health APIs and AI-powered insights — built for Africa's future of care.
                </p>

                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <Link
                    href="/register"
                    className="hh-btn hh-btn-primary px-6 py-2 rounded-lg bg-[#003DB8] text-white hover:bg-[#0030a0] transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]/30"
                  >
                    Create account
                  </Link>
                  <Link
                    href="/docs"
                    className="hh-btn hh-btn-secondary px-6 py-2 rounded-lg bg-white text-[#003DB8] border border-slate-200 hover:bg-slate-50 transition"
                  >
                    View docs
                  </Link>
                  {/* <Link
                    href="/dashboard"
                    className="hh-btn hh-btn-ghost px-6 py-2 rounded-lg text-slate-700 border border-transparent hover:bg-slate-100 transition"
                  >
                    Dashboard
                  </Link> */}
                </div>

                <div className="mt-12">
                  <div className="text-xs text-gray-600 text-center md:text-left">Quickstart</div>
                  <pre className="mt-3 bg-gray-100 text-black rounded-md p-4 overflow-auto text-sm">{`// Install SDK
npm install @medihub/sdk

// Fetch patient vitals
import medihub from '@medihub/sdk'
const client = medihub({ apiKey: process.env.MEDIHUB_KEY })
await client.vitals.list({ patientId: 'patient_123' })`}</pre>
                </div>
              </div>

              <div>
                <div className="rounded-xl border p-8 bg-gradient-to-b from-white to-[#f8fafc] shadow-xl">
                  <h3 className="font-semibold text-center">Live API Playground</h3>
                  <p className="text-sm text-slate-600 mt-3 text-center">Try endpoints with sandbox data and role-based tokens.</p>

                  <pre className="mt-6 bg-gray-100 text-black p-4 rounded-md text-sm overflow-auto">{`GET /api/patients/123/vitals
Authorization: Bearer <SANDBOX_KEY>`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center">Services</h2>
            <p className="text-black mt-4 text-center text-lg max-w-2xl mx-auto">
              Core platform services and integrations — a lightweight MVP view.
            </p>
            <div className="mt-12">
            </div>
          </div>
        </section>

        {/* Features */}
  <section className="bg-white py-24">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 text-center">Platform features</h2>
              <p className="text-black mt-4 text-center text-lg max-w-2xl mx-auto">
                Everything teams need to build production-grade health applications.
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-lg shadow-sm text-center hover:shadow-lg transform hover:-translate-y-1 transition">
                  <h3 className="font-semibold text-slate-900 text-xl">APIs & SDKs</h3>
                  <p className="mt-4 text-black">
                    Unified REST and realtime APIs for patient records, consent, and events.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-lg shadow-sm text-center hover:shadow-lg transform hover:-translate-y-1 transition">
                  <h3 className="font-semibold text-slate-900 text-xl">Auth & Access</h3>
                  <p className="mt-4 text-black">
                    Role-based auth, consent workflows, SSO, and audit logs for compliance.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-lg shadow-sm text-center hover:shadow-lg transform hover:-translate-y-1 transition">
                  <h3 className="font-semibold text-slate-900 text-xl">Realtime</h3>
                  <p className="mt-4 text-black">
                    Push updates for vitals, alerts and collaborative workflows using websockets and edge functions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customers */}
        <section className="container py-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Who uses Medihub</h2>
            <p className="text-black mt-4 text-lg max-w-2xl mx-auto">
              Hospitals, research teams, and digital health startups trust Medihub.
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">Ghana Health Service</div>
              <div className="p-4 bg-white rounded-lg shadow-sm">University Hospital</div>
              <div className="p-4 bg-white rounded-lg shadow-sm">ClinicOne</div>
              <div className="p-4 bg-white rounded-lg shadow-sm">HealthLab</div>
              <div className="p-4 bg-white rounded-lg shadow-sm">ResearchX</div>
              <div className="p-4 bg-white rounded-lg shadow-sm">Next.js</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-24 bg-white py-16" aria-label="Call to action">
          <div className="max-w-6xl mx-auto text-center w-full min-h-[200px] flex flex-col items-center justify-center py-16">
            <p className="text-black text-3xl text-center font-bold">Take Control of Your Health</p>
            <button className="mt-4 px-6 py-4 text-[#0d172a] bg-white rounded-2xl" aria-label="Start your health journey">
              Start Your Health Journey
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}