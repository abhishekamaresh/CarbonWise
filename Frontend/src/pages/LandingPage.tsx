import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Navbar from "../components/Navbar"
import EmissionSources from "../components/EmissionSources"
import InterestingFacts from "../components/InterestingFacts"
import Sidebar from "../components/Sidebar"

export default function LandingPage() {

  const user = false;

  return (
    <div className={`min-h-screen bg-gray-50 ${user ? 'pl-64' : ''}`}>
      {user ? <Sidebar /> : <Navbar />}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Leaf className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Carbon Footprint</h1>
            <p className="text-xl mb-8">Join the global movement towards sustainability. Understand and reduce your environmental impact today.</p>
            {!user && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-white text-green-600 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmissionSources />
      <InterestingFacts />

      {/* Call to Action */}
      {!user && (
        <div className="bg-green-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of others who are actively reducing their carbon footprint.</p>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
            >
              Start Tracking Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}