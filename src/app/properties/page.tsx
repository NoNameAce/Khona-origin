"use client";

import { useEffect, useState } from "react";
import { getProperty } from "@/entities/property/service";
import Link from "next/link";
import { Property } from "@/entities/property/model";
import { Bookmark, DollarSign, MapPin } from "lucide-react";

export default function PropertiesPage() {
  const [data, setData] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [savedProperties, setSavedProperties] = useState<{ [key: string]: boolean }>({});

  // Filter states
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function fetchData() {
      const properties = await getProperty();
      setData(properties || []);
    }
    fetchData();
  }, []);

  const filteredProperties = data.filter((prop) => {
    return (
      (location ? prop.location.toLowerCase().includes(location.toLowerCase()) : true) &&
      (propertyType ? prop.type === propertyType : true) &&
      (price ? prop.price <= parseFloat(price) : true)
    );
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleBookmark = (propertyId: string) => {
    setSavedProperties((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Properties</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="Location"
          className="p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Property Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="rent">Rent</option>
        </select>
        <input
          placeholder="$ Set the Price"
          className="p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          onClick={() => setCurrentPage(1)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProperties.map((prop: Property) => (
          <div key={prop.propertyId} className="border rounded-lg overflow-hidden">
            <img
              src={prop.mainImage || "/default-image.jpg"}
              alt={prop.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">{prop.name}</h2>
                <button
                  className={`rounded-full p-2 transition-colors ${
                    savedProperties[prop.propertyId] ? "bg-white text-black" : "bg-gray-200"
                  }`}
                  onClick={() => toggleBookmark(prop.propertyId)}
                >
                  <Bookmark
                    className="w-6 h-6"
                    fill={savedProperties[prop.propertyId] ? "black" : "none"}
                    stroke={savedProperties[prop.propertyId] ? "black" : "white"}
                  />
                </button>
              </div>
              <p className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-500" /> {prop.location}
              </p>
              <p className="flex items-center gap-2 font-bold mb-2">
                <DollarSign className="w-5 h-5 text-green-500" /> {prop.price}
              </p>
              <Link href={`/properties/${prop.propertyId}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
