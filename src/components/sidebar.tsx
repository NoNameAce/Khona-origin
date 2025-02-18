"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Building,
  LogIn,
  UserPlus,
  Info,
  Mail,
  FileText,
  Shield,
  User,
} from "lucide-react"
import { decodeUserToken } from "@/entities/auth/token"
import { getProperty } from "@/entities/property/service"

const Sidebar: React.FC = () => {
  const [decoded, setDecoded] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const token = decodeUserToken()
    setDecoded(token)
  }, [pathname])

  const baseRoutes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Properties", path: "/properties", icon: Building },
    { name: "Login", path: "/login", icon: LogIn },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Terms", path: "/terms", icon: FileText },
    { name: "Privacy", path: "/privacy", icon: Shield },
  ]

  const profileRoute = {
    name: "Profile",
    path: decoded?.role === "admin" ? "/admin/dashboard" : "/dashboard",
    icon: User,
  }

  const routes = [...baseRoutes, profileRoute]

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"} Menu
      </button>
      <div
        className={`fixed pt-10 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <nav className="p-4">
          <ul>
            {routes.map(({ name, path, icon: Icon }) => (
              <li key={path} className="mb-2">
                <Link href={path}>
                  <span
                    className={`flex items-center gap-2 p-2 rounded ${
                      pathname === path ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
