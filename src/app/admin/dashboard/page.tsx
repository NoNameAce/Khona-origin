"use client";

import { decodeUserToken, logoutUser } from "@/entities/auth/token";
import { getProperty } from "@/entities/property/service";
import { User } from "@/entities/user/model";
import { getUser } from "@/entities/user/service";
import { Users, Home, DollarSign, Activity, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<User | null>(null);

  const [properties, setProperties] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const token = decodeUserToken();
      setToken(token);
      console.log(token);

      const propertyResult = await getProperty();
      setProperties(propertyResult || []);
      console.log(propertyResult);

      const userResult = await getUser();
      setUsers(userResult || []);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span></span>
        <button onClick={handleLogout} className="mr-0 flex gap-2 items-center cursor-pointer  text-red-700">
          <LogOut className="" />
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Welcome {token?.name} (Admin)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Users className="mr-2" />
            Total Users
          </h3>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Home className="mr-2" />
            Total Properties
          </h3>
          <p className="text-3xl font-bold">{properties.length}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <DollarSign className="mr-2" />
            Total Revenue
          </h3>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Activity className="mr-2" />
            Active Listings
          </h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users Table */}
        <div>
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl font-bold mb-4">
              Recent User Registrations
            </h2>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.slice(0, 6).map((user) => (
                  <tr key={user.id || user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => router.push("/admin/users")}
              className="bg-green-500 hover:bg-white text-white hover:text-green-500 border border-green-500 py-1 px-2 rounded transition duration-300"
            >
              See all users
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Property Listings</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.slice(0, 6).map((property) => (
                  <tr key={property.propertyId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${property.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => router.push("/admin/properties")}
              className="bg-green-500 hover:bg-white text-white hover:text-green-500 border border-green-500 py-1 px-2 rounded transition duration-300"
            >
              See all properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
