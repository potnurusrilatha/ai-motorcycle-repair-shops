"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMotorcycle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Link from "next/link";

interface RepairShop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string | null;
  description: string | null;
  rating: number | null;
  specialty: string | null;
}

export default function ShopsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shops, setShops] = useState<RepairShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("/api/shops");
        if (response.ok) {
          const data = await response.json();
          setShops(data);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchShops();
    }
  }, [session]);

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading" || loading) {
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
          <Link href="/" className="flex items-center gap-2">
            <FaMotorcycle className="text-3xl text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              AI Motorcycle Repair Shops
            </h1>
          </Link>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Repair Shops Directory
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, city, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {filteredShops.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaMotorcycle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No repair shops found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Be the first to add a repair shop!"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {shop.name}
                  </h3>
                  {shop.rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="text-sm font-medium">{shop.rating}</span>
                    </div>
                  )}
                </div>

                {shop.specialty && (
                  <div className="mb-3">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                      {shop.specialty}
                    </span>
                  </div>
                )}

                {shop.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {shop.description}
                  </p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">
                      {shop.address}, {shop.city}, {shop.state} {shop.zipCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <a
                      href={`tel:${shop.phone}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {shop.phone}
                    </a>
                  </div>

                  {shop.email && (
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      <a
                        href={`mailto:${shop.email}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {shop.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
