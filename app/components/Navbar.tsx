"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import ThemeToggle from "./ThemeToggle"
import { Bookmark, Search } from "lucide-react"
import Profile from "./Profile"
import BellNotification from "./BellNotification"

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname.startsWith(path)
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-6 fixed top-0 left-0 w-full z-50 rounded-b-xl">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <Image src="/loopIn.png" alt="Logo" width={100} height={60} className="rounded-2xl" />
        </Link>
      </div>

      {/* Center: Navigation Links (if logged in) */}
      {session && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">
            <li>
              <Link
                href="/"
                className={isActive("/") ? "text-blue-400 font-bold " : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/network"
                className={isActive("/network") ? "text-blue-500 font-bold" : ""}
              >
                Network
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Right: Actions */}
      <div className="navbar-end gap-3">
        {session ? (
          <>
            <Link href="/network" className="btn btn-ghost btn-circle">
              <Search size={20} />
            </Link>
            <div className="btn btn-ghost btn-circle">
              <ThemeToggle />
            </div>
            <div className="btn btn-ghost btn-circle text-primary">
              <Bookmark size={20} />
            </div>
            <div className="btn btn-ghost btn-circle">
              <BellNotification />
            </div>
            <div className="ml-2">
              <Profile />
            </div>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Link href="/login">
              <button className="btn bg-[#1C836D] text-white">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
