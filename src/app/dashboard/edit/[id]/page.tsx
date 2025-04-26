'use client';
import { decodeUserToken } from "@/entities/auth/token";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById, updateProperty } from "@/entities/property/service";
import { Property } from "@/entities/property/model";
import Image from 'next/image';

export default function EditProperty() {
  const { id }: {id: string} = useParams();
  
  const router = useRouter();

  const token = decodeUserToken();

  const [name, setName] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPropertyData = async () => {
        try {
          const property = await getPropertyById(id);
          
          setName(property.name);
          setPrice(property.price);
          setLocation(property.location);
          setDescription(property.description);
          setPhone(property.phone);
          setEmail(property.email);
          setType(property.type);
        } catch (error) {
          console.error("Failed to fetch property:", error);
        }
      };
      fetchPropertyData();
    }
  }, [id]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const mainImageBase64 = mainImage ? await fileToBase64(mainImage) : "";
    const image1Base64 = image1 ? await fileToBase64(image1) : "";
    const image2Base64 = image2 ? await fileToBase64(image2) : "";
    const image3Base64 = image3 ? await fileToBase64(image3) : "";

    const updatedProperty: Property = {
      propertyId: id,
      userId: token?.id,
      name: name,
      mainImage: mainImageBase64,
      image1: image1Base64,
      image2: image2Base64,
      image3: image3Base64,
      price: price,
      location: location,
      description: description,
      phone: phone,
      email: email,
      type: type,
    };

    try {
      await updateProperty(updatedProperty); 
      router.push('/admin/properties');
    } catch (error) {
      console.error("Failed to update property:", error);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Таҳрири Мол
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="block text-lg font-medium text-gray-700">Тасвири асосӣ:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setMainImage)}
              className="w-full max-w-[300px] p-3 mt-2 border border-gray-300 rounded-lg"
              accept="image/*"
            />
            {mainImage && (
              <Image
                src={URL.createObjectURL(mainImage)}
                alt="Main Image Preview"
                width={240}
                height={240}
                className="mt-4 object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-lg font-medium text-gray-700">Тасвири 1:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setImage1)}
              className="w-full max-w-[300px] p-3 mt-2 border border-gray-300 rounded-lg"
              accept="image/*"
            />
            {image1 && (
              <Image
                src={URL.createObjectURL(image1)}
                alt="Image 1 Preview"
                width={240}
                height={240}
                className="mt-4 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-lg font-medium text-gray-700">Тасвири 2:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setImage2)}
              className="w-full max-w-[300px] p-3 mt-2 border border-gray-300 rounded-lg"
              accept="image/*"
            />
            {image2 && (
              <Image
                src={URL.createObjectURL(image2)}
                alt="Image 2 Preview"
                width={240}
                height={240}
                className="mt-4 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-lg font-medium text-gray-700">Тасвири 3:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setImage3)}
              className="w-full max-w-[300px] p-3 mt-2 border border-gray-300 rounded-lg"
              accept="image/*"
            />
            {image3 && (
              <Image
                src={URL.createObjectURL(image3)}
                alt="Image 3 Preview"
                width={240}
                height={240}
                className="mt-4 object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Номи мол:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Нарх:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Макон:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Тавсиф:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Телефон:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Почта:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Навъи мол:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="apartment">Апартамент</option>
              <option value="house">Хона</option>
              <option value="office">Офис</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Муҳаррик кардани мол
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
