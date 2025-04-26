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
          <h1 className="text-5xl font-bold mb-4">Хонаи орзуи худро ёбед</h1>
          <p className="text-lg mb-6">
            Маконҳои мувофиқро бо рӯйхатҳои васеъи мо кашф кунед.
          </p>
          
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Махсуси Маконҳо
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {randomProperties.map((property: Property) => (
            <div
              key={property.propertyId}
              className="border rounded-lg overflow-hidden shadow-lg relative"
            >
              <Image
                src={property.mainImage}
                alt={`Макон ${property.name}`}
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
                    Намудороти ҷузъиён
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Чаро моро интихоб мекунед?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: "Интихоби васеъ",
            desc: "Аз миёни ҳазорҳо макон интихоб кунед, то макони мувофиқро пайдо кунед.",
          },
          {
            title: "Машварати мутахассисон",
            desc: "Гурӯҳи мутахассисони мо омода аст, ки ҳар қадами худро раҳнамоӣ кунад.",
          },
          {
            title: "Тамоми муомилаҳои бехатар",
            desc: "Бо хотироти ором, бидонед, ки муомилаҳои шумо бехатар ва бехатар аст.",
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
          Ба гуфтаи мизоҷони мо
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[{
            name: "Джон Доу",
            review: "Хизматрасонии аъло! Ман хонаи орзуи худро дар як ҳафта ёфтам.",
          },
          {
            name: "Сара Смит",
            review: "Гурӯҳи бисёр касбӣ ва кӯмакрасон. Ба тавсия медиҳам!",
          },
          {
            name: "Майкл Ли",
            review: "Муомилаи осон ва дастгирии аъло аз ҷониби мизоҷ!",
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
        <h2 className="text-3xl font-semibold mb-4">Ҳолатҳоро навсозӣ кунед</h2>
        <p className="mb-4">
          Барои гирифтани рӯйхати навтарин ва машваратҳо дар бораи амвол, нашрияро ба мо пайваст кунед.
        </p>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Почтаи электронии худро ворид кунед"
            className="p-3 border rounded w-80"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">
            Пайваст шудан
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 px-6 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Бозоргоҳи Амволи Мақсуд</h3>
            <p>Ҳонаи орзуи худро бо осонӣ ёбед.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Линкҳои зуд</h3>
            <ul>
              <li>
                <Link href="/about">
                  <span className="hover:underline">Дар бораи мо</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:underline">Контакт</span>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <span className="hover:underline">Маконҳо</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Моро пайгирӣ кунед</h3>
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
            &copy; {new Date().getFullYear()} Бозоргоҳи Амволи Мақсуд. Ҳамаи ҳуқуқҳо ҳифз шудаанд.
          </p>
        </div>
      </footer>
    </div>
  );
}
