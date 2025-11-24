"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Motorcycle Repair Shops
          </h1>
          <p className="text-gray-600">
            Find the best motorcycle repair shops near you
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
