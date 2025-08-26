import React, { useState } from "react";
import PageContent from "../layout/PageContent";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log("Form Data:", formData);
    // Form reset
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <PageContent>
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center lg:px-10">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Bize Ulaşın
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Sorularınız, önerileriniz veya destek talepleriniz için bizimle
            iletişime geçin. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                  İletişim Bilgileri
                </h2>
                <p className="text-gray-600">
                  Aşağıdaki bilgilerden bize ulaşabilir veya formu doldurarak
                  mesajınızı gönderebilirsiniz.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Telefon</h3>
                    <p className="text-gray-600">(225) 555-0118</p>
                    <p className="text-gray-600">(225) 555-0119</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">E-posta</h3>
                    <p className="text-gray-600">berkay@kneat.com</p>
                    <p className="text-gray-600">support@kneat.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Adres</h3>
                    <p className="text-gray-600">
                      481 Creekside Lane Avila Beach,
                      <br />
                      CA 93424, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-gray-600">
                      Pazartesi - Cuma: 9:00 - 18:00
                    </p>
                    <p className="text-gray-600">Cumartesi: 10:00 - 16:00</p>
                    <p className="text-gray-600">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Mesaj Gönder
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-medium text-gray-700"
                    >
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-medium text-gray-700"
                    >
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="E-posta adresinizi girin"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Konu *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="Mesajınızın konusunu girin"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  <Send className="h-5 w-5" />
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Konumumuz</h2>
            <p className="mb-8 text-gray-600">
              Mağazamızı ziyaret etmek isterseniz aşağıdaki haritadan konumumuzu
              görebilirsiniz.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="flex h-96 items-center justify-center bg-gray-200">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-gray-600">
                  Harita burada görüntülenecek
                  <br />
                  <span className="text-sm">
                    (Google Maps entegrasyonu için API key gerekli)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContent>
  );
}
