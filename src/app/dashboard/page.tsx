'use client'
import { decodeUserToken, logoutUser } from "@/entities/auth/token";
import { getProperty } from "@/entities/property/service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

export default function DashboardPage() {



  const router = useRouter();
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [userProperties, setUserProperties] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [propAmount, setPropAmount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const properties = await getProperty();
      setAllProperties(properties || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const decoded = decodeUserToken();
    
    if (!decoded) {
      router.push("/login");
      return;
    }
    setUserName(decoded.name || "");
    setUserEmail(decoded.email || "");
    const filtered = allProperties.filter(
      (prop) => prop.userId === decoded.id
    );
    setUserProperties(filtered);
    setPropAmount(filtered.length);
  }, [allProperties, router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <span></span>
        <button onClick={handleLogout} className="mr-0 flex gap-2 items-center cursor-pointer  text-red-700">
          <LogOut className="" />
          Logout
        </button>
      </div>
        <h1 className="text-3xl font-bold mb-6">Welcome {userName}</h1>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">My Properties</h3>
          <p className="text-3xl font-bold">{propAmount}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Views</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">New Messages</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Properties</h2>
        {userProperties.length === 0 ? (
          <p>You have no posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProperties.map((prop) => (
              <div
                key={prop.propertyId}
                className="border rounded-lg p-4 flex items-center"
              >
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={prop.mainImage || `/placeholder.svg?height=80&width=80`}
                    alt={prop.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{prop.name}</h3>
                  <p className="text-gray-600">{prop.location}</p>
                  <div className="mt-2">
                    <Link
                      href={`/dashboard/edit/${prop.propertyId}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="flex-shrink-0 text-gray-500">
                  {prop.views || 0} views
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link
            href="/dashboard/my-properties"
            className="text-blue-600 hover:underline"
          >
            View all properties
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div>
              <p className="font-semibold">New message received</p>
              <p className="text-gray-600">
                You have a new message about your property at 123 Main St.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <Link href="/dashboard/post">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-green-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Post New Property
          </button>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="font-semibold">Property Viewed</p>
            <p className="text-gray-600">
              Your property at 456 Elm St was viewed by a potential buyer.
            </p>
            <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
          </div>
        </div>
      </section>
    </div>
  );
}
