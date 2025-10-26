'use client';

import Link from "next/link";

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img 
              src="https://g9kbtbs1bu.ufs.sh/f/woziFUfAWTFp7BlfiEvRlS1GrWLQhwZMzocm87npUf63sV5v" 
              alt="Medihub Logo" 
              className="w-8 h-8"
            />
            <Link href="/" className="text-2xl font-bold text-gray-900">Medihub</Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/signin" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                A <span className="text-blue-600">secure</span> health data platform for builders
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Medhub connects hospitals, patients and researchers with secure consent-driven health APIs and AI-governed insights — built for AI/data/future of care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Get started!
                </Link>
                <Link
                  href="/signin"
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96">
                {/* Abstract Diamond Shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Top Right - Dark Blue */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-lg transform rotate-45 opacity-80"></div>
                    {/* Bottom Right - Medium Blue */}
                    <div className="absolute bottom-12 right-8 w-24 h-24 bg-blue-600 rounded-lg transform rotate-45 opacity-70"></div>
                    {/* Bottom Left - Light Blue */}
                    <div className="absolute bottom-0 left-4 w-28 h-28 bg-blue-400 rounded-lg transform rotate-12 opacity-60"></div>
                    {/* Top Left - Very Light Blue */}
                    <div className="absolute top-8 left-0 w-20 h-20 bg-blue-300 rounded-lg transform rotate-45 opacity-50"></div>
                    {/* Center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-lg transform rotate-12 opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Health Predictions
              </h3>
              <p className="text-gray-600">
                Personalized health predictions based on your medical history and real-time data analysis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Data Management
              </h3>
              <p className="text-gray-600">
                Consent-driven APIs ensuring your health data is securely managed with full control.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hospital Integration
              </h3>
              <p className="text-gray-600">
                Seamlessly connect with hospitals, clinics and healthcare providers across the network.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Monitoring
              </h3>
              <p className="text-gray-600">
                Track your health metrics in real-time with continuous monitoring and instant alerts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Researcher Access
              </h3>
              <p className="text-gray-600">
                Contribute to medical research while maintaining complete control over your data privacy.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Early Detection
              </h3>
              <p className="text-gray-600">
                AI-powered early detection and personalized recommendations based on daily interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Medihub
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Medihub is a cutting-edge platform revolutionizing healthcare data management in Africa. 
            We provide secure, consent-driven APIs that connect hospitals, patients, and researchers 
            to enable better healthcare outcomes through AI-powered insights and seamless data sharing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Healthcare Facilities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://g9kbtbs1bu.ufs.sh/f/woziFUfAWTFp7BlfiEvRlS1GrWLQhwZMzocm87npUf63sV5v" 
                  alt="Medihub Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">Medihub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Secure health data platform connecting hospitals, patients, and researchers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2024 Medihub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
