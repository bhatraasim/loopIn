"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerifyPage() {
  const params = useParams();
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const res = await fetch(`/api/users/${params.userId}/verify/${params.token}`);
        if (!res.ok) throw new Error("Invalid or expired link");

        const data = await res.json();
        console.log(data);

        setValidUrl(true);
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params?.userId && params?.token) {
      verifyEmailUrl();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Verifying email...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {validUrl ? (
        <div className="text-center bg-green-100 p-6 rounded-lg shadow-md max-w-md">
          <h1 className="text-2xl font-semibold text-green-800 mb-4">
            ✅ Email Verified Successfully!
          </h1>
          <p className="mb-6 text-gray-700">
            You can now log in to your account.
          </p>
          <Link href="/login">
            <button className="bg-[#1C836D] hover:bg-[#0BAACA] text-white px-6 py-2 rounded-lg transition">
              Go to Login
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold">404 - Invalid or Expired Link</h1>
          <p className="text-gray-500 mt-2">Please request a new verification link.</p>
        </div>
      )}
    </div>
  );
}
