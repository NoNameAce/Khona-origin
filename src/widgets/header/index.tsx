"use client";
import Link from "next/link";
import { Home, LogIn, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { decodeUserToken } from "@/entities/auth/token";
import { usePathname } from "next/navigation";

export default function Header() {
  interface DecodedUserToken {
    role: string;
  }

  const [decoded, setDecoded] = useState<DecodedUserToken | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = decodeUserToken();
    setDecoded(token);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl flex items-center">
          <Home className="mr-2" />
          Home
        </Link>

        <div className="hidden md:flex justify-between gap-6 items-center">
          <Link href={"/properties"} className="text-lg hover:text-blue-500">
            Properties
          </Link>

          <Link href={"/about"} className="text-lg hover:text-blue-500">
            About
          </Link>

          <Link href={"/contact"} className="text-lg hover:text-blue-500">
            Contact
          </Link>

          <Link href={"/terms"} className="text-lg hover:text-blue-500">
            Terms
          </Link>

          <Link href={"/privacy"} className="text-lg hover:text-blue-500">
            Privacy
          </Link>

          <Link
            href={decoded?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
            className="text-lg hover:text-blue-500"
          >
            Profile
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <Link href={"/register"} className="hover:text-blue-500">
            Registration
          </Link>

          <Link
            href={"/login"}
            className="flex justify-between items-center gap-2 hover:text-blue-500"
          >
            <LogIn color="blue" />
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-blue-500">
            <Menu />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href={"/properties"} className="text-lg hover:text-blue-500">
              Properties
            </Link>

            <Link href={"/about"} className="text-lg hover:text-blue-500">
              About
            </Link>

            <Link href={"/contact"} className="text-lg hover:text-blue-500">
              Contact
            </Link>

            <Link href={"/terms"} className="text-lg hover:text-blue-500">
              Terms
            </Link>

            <Link href={"/privacy"} className="text-lg hover:text-blue-500">
              Privacy
            </Link>

            <Link
              href={decoded?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
              className="text-lg hover:text-blue-500"
            >
              Profile
            </Link>

            <Link href={"/register"} className="text-lg hover:text-blue-500">
              Registration
            </Link>

            <Link
              href={"/login"}
              className="flex justify-between items-center gap-2 hover:text-blue-500"
            >
              <LogIn color="blue" />
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}