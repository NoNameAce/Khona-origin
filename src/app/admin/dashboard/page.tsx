"use client";

import { decodeUserToken, logoutUser } from "@/entities/auth/token";
import { getProperty } from "@/entities/property/service";
import { User } from "@/entities/user/model";
import { getUser } from "@/entities/user/service";
import { Users, Home, DollarSign, Activity, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Property {
  propertyId: string;
  name: string;
  price: number;
  phone: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const token = decodeUserToken();
      setToken(token);
      console.log(token);

      const propertyResult: Property[] = await getProperty();
      setProperties(propertyResult || []);
      console.log(propertyResult);

      const userResult: User[] = await getUser();
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
        <button onClick={handleLogout} className="mr-0 flex gap-2 items-center cursor-pointer text-red-700">
          <LogOut />
          Баромадан
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Хуш омадед {token?.name} (Админ)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Users className="mr-2" />
            Шумораи умумии истифодабарандагон
          </h3>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Home className="mr-2" />
            Шумораи умумии амвол
          </h3>
          <p className="text-3xl font-bold">{properties.length}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <DollarSign className="mr-2" />
            Даромади умумӣ
          </h3>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Activity className="mr-2" />
            Эълонҳои фаъол
          </h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users Table */}
        <div>
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl font-bold mb-4">Бақайдгирии охирини истифодабарандагон</h2>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ном</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Почтаи электронӣ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Рақами телефон</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.slice(0, 6).map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
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
              Дидани ҳамаи истифодабарандагон
            </button>
          </div>
        </div>

        {/* Properties Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Эълонҳои охирини амвол</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Амвол</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Нарх</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Рақами телефон</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.slice(0, 6).map((property) => (
                  <tr key={property.propertyId}>
                    <td className="px-6 py-4 whitespace-nowrap">{property.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${property.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.phone}</td>
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
              Дидани ҳамаи амволҳо
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
