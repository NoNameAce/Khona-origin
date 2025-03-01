"use client";

import { Property } from "@/entities/property/model";
import { getProperty, deleteProperty } from "@/entities/property/service";
import { Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminPropertiesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const propertyResult = await getProperty();
      setProperties(propertyResult || []);
    }
    fetchData();
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredProperties);
  

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property.propertyId);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteProperty(propertyToDelete);
      setProperties((prev) =>
        prev.filter((prop) => prop.propertyId !== propertyToDelete)
      );
      setIsDialogOpen(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDialogOpen(false);
    setPropertyToDelete(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Properties</h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => router.push("/dashboard/post")}
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add New Property
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProperties.map((property, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{property.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.location}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/dashboard/edit/${property.propertyId}`}
                  >
                    <button className="text-blue-600 hover:underline mr-2">
                      <Edit className="inline mr-1" />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(property)}
                    className="text-red-600 hover:underline"
                  >
                    <Trash2 className="inline mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this property?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
