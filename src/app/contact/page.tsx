import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Бо мо тамос гиред</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Бо мо дар тамос шавед</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Ном
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Номи Шумо"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Почта
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Почтаи Шумо"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Паём
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Паёми Шумо"
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Фиристодан
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Маълумоти тамос</h2>
          <div className="space-y-4">
            <p className="flex items-center">
              <Mail className="mr-2" />
              Почта: info@realestatemarketplace.com
            </p>
            <p className="flex items-center">
              <Phone className="mr-2" />
              Телефон: (123) 456-7890
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2" />
              Адрес: 123 Реал Эстейт Ст, Шаҳр, Давлат 12345
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Соатҳои офис</h3>
            <p>Душанбе - Ҷумъа: 9:00 AM - 5:00 PM</p>
            <p>Шанбе: 10:00 AM - 2:00 PM</p>
            <p>Якшанбе: Баста</p>
          </div>
        </div>
      </div>
    </div>
  )
}
