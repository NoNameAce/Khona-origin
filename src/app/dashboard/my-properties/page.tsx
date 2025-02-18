'use client'

import { decodeUserToken } from "@/entities/auth/token";
import { deleteProperty, getProperty } from "@/entities/property/service";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPropertiesPage() {
  const router = useRouter();
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [userProperties, setUserProperties] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any | null>(null);

  const token = useMemo(() => decodeUserToken(), []);

  useEffect(() => {
    async function fetchProperties() {
      const properties = await getProperty();
      setAllProperties(properties || []);
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const filtered = allProperties.filter(
      (prop) => prop.userId === token.id
    );
    setUserProperties(filtered);
  }, [allProperties, token, router]);

  const handleDeleteClick = (property: any) => {
    setPropertyToDelete(property.propertyId);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteProperty(propertyToDelete);

      setAllProperties((prev) => prev.filter((prop) => prop.propertyId !== propertyToDelete));

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link href="/dashboard/post">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Add New Property
          </button>
        </Link>
      </div>

      {userProperties.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProperties.map((prop) => (
            <div key={prop.propertyId} className="border rounded-lg overflow-hidden">
              <img
                src={prop.mainImage || `/placeholder.svg?height=200&width=400`}
                alt={prop.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{prop.name}</h2>
                <p className="mb-2">{prop.location}</p>
                <p className="font-bold mb-2">${prop.price}</p>
                <p className="mb-4">{prop.description}</p>
                <div className="flex justify-end space-x-2">
                  <Link href={`/dashboard/edit/${prop.propertyId}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(prop)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this property?</h2>
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
