"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Bookmark, Search, Menu, X } from "lucide-react";
import Profile from "./Profile";
import BellNotification from "./BellNotification";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 sm:px-6 fixed top-0 left-0 w-full z-50 rounded-b-xl">
      {/* Left: Logo & Nav Links */}
      <div className="navbar-start flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/loopIn.png"
            alt="Logo"
            width={100}
            height={60}
            className="rounded-2xl"
          />
        </Link>

        {session && (
          <div className="flex gap-3 font-semibold text-sm sm:text-base">
            <Link
              href="/"
              className={isActive("/") ? "text-blue-500 font-bold" : ""}
            >
              Home
            </Link>
            <Link
              href="/network"
              className={isActive("/network") ? "text-blue-500 font-bold" : ""}
            >
              Network
            </Link>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="navbar-end gap-2 lg:gap-3">
        {/* Mobile Menu Toggle */}
        {session && (
          <button
            className="lg:hidden btn btn-ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        )}

        {session ? (
          <>
            <Link href="/network" className="btn btn-ghost btn-circle hidden sm:flex">
              <Search size={20} />
            </Link>
            <div className="btn btn-ghost btn-circle hidden sm:flex">
              <ThemeToggle />
            </div>
            <div className="btn btn-ghost btn-circle text-primary hidden sm:flex">
              <Bookmark size={20} />
            </div>
            <div className="btn btn-ghost btn-circle hidden sm:flex">
              <BellNotification />
            </div>
            <div className="ml-1 hidden sm:block">
              <Profile />
            </div>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Link href="/login">
              <button className="btn bg-[#1C836D] text-white btn-sm sm:btn-md">Login</button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && session && (
        <div className="absolute top-full left-0 w-full bg-base-100 border-t z-40 py-2 px-4 flex flex-col lg:hidden gap-3 font-semibold">
          <Link
            href="/network"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <Search size={18} /> Search
          </Link>
          <div className="flex items-center gap-2">
            <Bookmark size={18} /> Save
          </div>
          <div className="flex items-center gap-2">
            <BellNotification />
            Notifications
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle /> Theme
          </div>
          <Profile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
