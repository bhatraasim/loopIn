"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./Mode_Button";
import Input from "./Input";
import { Bell, Bookmark, PersonStanding,Search } from "lucide-react";


const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-5 py-3 bg-white shadow-sm flex justify-between items-center">
      <ThemeToggle />
      {/* Logo */}
      <Link href="/">
        <Image src="/image.png" alt="Logo" width={120} height={40} />
      </Link>

      {/* Conditional Rendering: If user is logged in, show different options */}
      {session ? (
        <div className="flex justify-between  gap-140 font-medium">
          <div className="flex gap-10">
            <div className="relative font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-[-2px] after:scale-x-100 after:transition-transform after:duration-300 "><Link href={"/home"} > Home </Link></div>
            <div className="relative font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-[-2px] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"><Link href={"/home"}>Network </Link></div>
            <div className="relative font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-[-2px] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"><Link href={"/home"}>Events </Link></div>
          </div>
          <div className="flex gap-8"> 
            <div className=""><Search /></div>
            <div className=""><Bookmark /></div>
            <div className=""> <Bell /></div>
            <div className="mx-4"><PersonStanding /></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 ">
        <Input  placeholder="Email"/>
        <Input placeholder="Password" />
        <Link href="/login">
          <button className="bg-[#0BAACA] text-white px-4 py-2 rounded-md hover:bg-[#60CDE3] transition h-12 w-20"
          >
            Login
          </button>
        </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
