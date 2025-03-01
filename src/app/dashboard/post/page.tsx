'use client'

import { decodeUserToken } from "@/entities/auth/token";
import { userPost } from "@/entities/property/service";
import React, { useState } from "react";
import Image from "next/image";

export default function PostProperty() {
  const token = decodeUserToken();
  console.log(token);

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  function clear() {
    setName("");
    setMainImage(null);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setPrice("");
    setLocation("");
    setDescription("");
    setPhone("");
    setEmail("");
    setType("");
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const mainImageBase64 = mainImage ? await fileToBase64(mainImage) : "";
    const image1Base64 = image1 ? await fileToBase64(image1) : "";
    const image2Base64 = image2 ? await fileToBase64(image2) : "";
    const image3Base64 = image3 ? await fileToBase64(image3) : "";

    const postData = {
      propertyId: `${Date.now()}`,
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

    await userPost(postData);
    clear();
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
        Post a New Property
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="block text-lg font-medium text-gray-700">Main Image:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setMainImage)}
              className="w-full max-w-[300px] p-3 mt-2 border border-gray-300 rounded-lg"
              accept="image/*"
            />
            {mainImage && mainImage instanceof File && (
              <Image
                src={URL.createObjectURL(mainImage)}
                alt="Main Image Preview"
                width={240}
                height={240}
                className="mt-4 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col items-center">
              <label className="block text-lg font-medium text-gray-700">Image 1:</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, setImage1)}
                className="w-full max-w-[150px] p-3 mt-2 border border-gray-300 rounded-lg"
                accept="image/*"
              />
              {image1 && image1 instanceof File && (
                <Image
                  src={URL.createObjectURL(image1)}
                  alt="Image 1 Preview"
                  width={160}
                  height={160}
                  className="mt-4 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-lg font-medium text-gray-700">Image 2:</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, setImage2)}
                className="w-full max-w-[150px] p-3 mt-2 border border-gray-300 rounded-lg"
                accept="image/*"
              />
              {image2 && image2 instanceof File && (
                <Image
                  src={URL.createObjectURL(image2)}
                  alt="Image 2 Preview"
                  width={160}
                  height={160}
                  className="mt-4 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-lg font-medium text-gray-700">Image 3:</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, setImage3)}
                className="w-full max-w-[150px] p-3 mt-2 border border-gray-300 rounded-lg"
                accept="image/*"
              />
              {image3 && image3 instanceof File && (
                <Image
                  src={URL.createObjectURL(image3)}
                  alt="Image 3 Preview"
                  width={160}
                  height={160}
                  className="mt-4 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Property Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Property Type:</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="">Select type</option>
              <option value="hause">Hause</option>
              <option value="apartment">Apartment</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Post Property
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
