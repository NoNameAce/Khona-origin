import ImageGallery from "@/components/image-gallery"; 
import { getPropertyById } from "@/entities/property/service";
import { DollarSign, Mail, MapPin, Phone } from "lucide-react";

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const property = await getPropertyById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageGallery
            mainImage={property.mainImage}
            image1={property.image1}
            image2={property.image2}
            image3={property.image3}
            description={property.description}
          />
        </div>

        <div className="border rounded-lg p-6 flex flex-col h-full">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Тафсилоти Мол</h2>

            <p className="flex items-center gap-2 text-2xl font-bold mb-2">
              <DollarSign className="w-5 h-5 text-green-500" /> ${property.price}
            </p>

            <p className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-500" /> {property.location}
            </p>

            <p className="mb-4">{property.description}</p>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold mb-2">Маълумоти Мусоидат</h3>

              <p className="flex items-center gap-2 mb-1">
                <Phone className="w-5 h-5 text-blue-500" />
                <strong>Телефон:</strong> {property.phone}
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-500" />
                <strong>Имейл:</strong> {property.email}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
              Бо Ваколатдор Тамос Гиред
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
