import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../components/Mode_Button";

export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/image.png" alt="Logo" width={120} height={40} />
        </Link>
  
        {/* Login Button */}
        <Link href="/login">
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Login
          </button>
        </Link>

        <ThemeToggle />
      </nav>
    );
  }
  
