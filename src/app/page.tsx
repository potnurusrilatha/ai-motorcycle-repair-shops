"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaMotorcycle, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMotorcycle className="text-3xl text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              AI Motorcycle Repair Shops
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">{session.user?.name}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {session.user?.name?.split(" ")[0]}!
          </h2>
          <p className="text-xl text-gray-600">
            Find the perfect motorcycle repair shop for your needs
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <FaSearch className="text-2xl text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI-Powered Search
            </h3>
            <p className="text-gray-600">
              Use advanced AI to find repair shops that match your specific needs
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <FaMapMarkerAlt className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Location-Based
            </h3>
            <p className="text-gray-600">
              Discover repair shops near you with real-time location data
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
              <FaMotorcycle className="text-2xl text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Specialist Shops
            </h3>
            <p className="text-gray-600">
              Find shops specializing in your motorcycle brand or repair type
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/shops"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Browse Repair Shops
          </Link>
        </div>
      </main>
    </div>
  );
}
