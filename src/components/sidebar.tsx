"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building,
  LogIn,
  Info,
  Mail,
  FileText,
  Shield,
  User,
  PanelLeftOpen,
  PanelRightOpen,
} from "lucide-react";
import { decodeUserToken } from "@/entities/auth/token";

interface DecodedUserToken {
  role: string;
}

const Sidebar: React.FC = () => {
  const [decoded, setDecoded] = useState<DecodedUserToken | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = decodeUserToken();
    setDecoded(token);
  }, [pathname]);

  const baseRoutes = [
    { name: "Саҳифаи хона", path: "/", icon: Home },
    { name: "Молҳо", path: "/properties", icon: Building },
    { name: "Вуруд", path: "/auth/login", icon: LogIn },
    { name: "Дар бораи мо", path: "/about", icon: Info },
    { name: "Контакт", path: "/contact", icon: Mail },
    { name: "Шартҳо", path: "/terms", icon: FileText },
    { name: "Махфият", path: "/privacy", icon: Shield },
  ];

  const profileRoute = {
    name: "Профил",
    path: decoded?.role === "admin" ? "/admin/dashboard" : "/dashboard",
    icon: User,
  };

  const routes = [...baseRoutes, profileRoute];

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />} 
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
  );
};

export default Sidebar;
