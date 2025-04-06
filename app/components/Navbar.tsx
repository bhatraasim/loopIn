"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./Mode_Button";
import { Bookmark,Search } from "lucide-react";
import Profile from "./Profile";
import BellNotification from "./BellNotification";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-5 py-2 bg-white shadow-xl flex justify-between items-center z-50 rounded-2xl h-17">
      <ThemeToggle />
      {/* Logo */}
      <Link href="/">
        <Image src="/loopIn.png" alt="Logo" width={170} height={60} />
      </Link>

      {/* Conditional Rendering: If user is logged in, show different options */}
      {session ? (
        <div className="flex justify-between items-center gap-20 font-medium">
          {/* Navigation Links */}
          <div className="flex gap-10">
            <div className={`relative font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-0 after:transition-transform after:duration-300 ${isActive("/") ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>
              <Link href="/">Home</Link>
            </div>
            <div className={`relative font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-0 after:transition-transform after:duration-300 ${isActive("/network") ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>
              <Link href="/network">Network</Link>
            </div>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center"> 
            <div className="p-2  hover:bg-blue-50 rounded-full">
              <Link href="/network"><Search size={20} /></Link>
            </div>
            <div className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
              <Bookmark size={20} />
            </div>
            <div className="p-2  hover:bg-blue-50 rounded-full">
              <BellNotification />
            </div>
            <div className="ml-2">
              <Profile />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="bg-[#0BAACA] text-white px-4 py-2 rounded-md hover:bg-[#60CDE3] transition h-12 w-20">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;