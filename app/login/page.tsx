"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents default navigation
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/"); // Redirect to dashboard after successful login
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <fieldset className="w-96 bg-base-200 border border-base-300 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-neutral w-full hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
