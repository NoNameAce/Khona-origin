import Link from "next/link";
import { getProperty } from "@/entities/property/service";
import { Bookmark } from "lucide-react";
import Image from "next/image";

export default async function HomePage() {

  type Property = {
    propertyId: string;
    name: string;
    location: string;
    price: number;
    mainImage: string;
  };
  const properties = await getProperty();

  const randomProperties = properties.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="container mx-auto px-4">
      <section className="relative h-[500px] flex items-center justify-center text-white bg-[url('/apartment.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-lg mb-6">
            Discover the perfect place with our extensive listings.
          </p>
          
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {randomProperties.map((property: Property) => (
            <div
              key={property.propertyId}
              className="border rounded-lg overflow-hidden shadow-lg relative"
            >
              <Image
                src={property.mainImage}
                alt={`Property ${property.name}`}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold mb-2">{property.name}</h3>
                  <button
                    className="top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
                <p className="mb-2">{property.location}</p>
                <p className="font-bold mb-2 text-lg">${property.price}</p>
                <Link href={`/properties/${property.propertyId}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: "Wide Selection",
            desc: "Browse through thousands of properties to find your perfect match.",
          },
          {
            title: "Expert Advice",
            desc: "Our team of real estate professionals is here to guide you every step of the way.",
          },
          {
            title: "Secure Transactions",
            desc: "Rest easy knowing that your property transactions are safe and secure.",
          }].map((item, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12 bg-gray-100 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          What Our Clients Say
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[{
            name: "John Doe",
            review: "Amazing service! Found my dream home within a week.",
          },
          {
            name: "Sarah Smith",
            review: "Highly professional and helpful team. Highly recommend!",
          },
          {
            name: "Michael Lee",
            review: "Smooth transaction and great customer support!",
          }].map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <p className="italic">&quot;{testimonial.review}&quot;</p>
              <h4 className="mt-4 font-semibold text-blue-500">
                - {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
        <p className="mb-4">
          Subscribe to our newsletter for the latest listings and real estate insights.
        </p>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border rounded w-80"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">
            Subscribe
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 px-6 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Real Estate Marketplace</h3>
            <p>Find your dream home with ease.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              <li>
                <Link href="/about">
                  <span className="hover:underline">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:underline">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <span className="hover:underline">Properties</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p>
            &copy; {new Date().getFullYear()} Real Estate Marketplace. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
