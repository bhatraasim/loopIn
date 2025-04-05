"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import Image from "next/image";

import loopIn from "../Images/loopIn.png";

function Footer(){
  return(
    <div className=" flex justify-between h-20 pt-6 font-light px-30">
      <div className=""><p>© 2025 Your Website. All rights reserved.</p></div>
      <div className="">Footer Link</div>
      <div className="">Privacy Policy </div>
      <div className="">Terms and Conditions</div>
    </div>
  )
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
    <div className=" w-screen relative  bg-gray-100 flex justify-between">
      <div className="mx-30 mt-30">
      <Image src={loopIn} alt={"image"} width={500} height={250} />
      </div>
    <div className=" bg-white p-15 mx-30 my-10 w-xl">
    <h1 className="text-3xl font-bold mb-4 m flex justify-center ">Get Started</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mt-6">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mt-6">
        
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mt-6">
        <input
          type="password"
          placeholder="Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#1C836D] text-white py-2 rounded hover:bg-[#0BAACA]"
      >
        Register
      </button>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-600">
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