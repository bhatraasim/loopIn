"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

function Footer() {
  return (
    <footer className="text-center text-gray-500 text-sm py-6">
      © 2025 LoopIn. All rights reserved.
    </footer>
  );
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      showNotification("Registration successful! Please log in.", "success");
      router.push("/login");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error"
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#ffffff] px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Create your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C836D] transition"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C836D] transition"
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C836D] transition"
            />
            <button
              type="submit"
              className="w-full bg-[#1C836D] hover:bg-[#0BAACA] text-white font-medium py-2 rounded-lg transition duration-300"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1C836D] hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
