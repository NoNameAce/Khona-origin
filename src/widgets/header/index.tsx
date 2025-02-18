import Link from "next/link"
import { Home, User, LogIn } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center">
          <Home className="mr-2" />
          Real Estate Marketplace
        </Link>
        <div className="space-x-4">
          <Link href="/properties" className="hover:text-blue-600">
            Properties
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600">
            <User className="inline mr-1" />
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-blue-600">
            <LogIn className="inline mr-1" />
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}

