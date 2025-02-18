"use client";

import { useState } from "react";

interface ImageGalleryProps {
  mainImage: string;
  image1: string;
  image2: string;
  image3: string;
  description: string;
}

export default function ImageGallery({
  mainImage,
  image1,
  image2,
  image3,
  description,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <img
        src={mainImage}
        alt={description}
        className="w-full h-96 object-cover rounded-lg mb-4 cursor-pointer"
        onClick={() => setSelectedImage(mainImage)}
      />
      <div className="grid grid-cols-3 gap-4 ">
        {[image1, image2, image3].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${description} ${index + 1}`}
            className="w-full h-24 object-cover rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Zoomed view" className="max-w-[90%] max-h-full rounded-lg" />
        </div>
      )}
    </>
  );
}
