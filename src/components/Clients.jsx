import brand1 from "../assets/clients/fa-brands-1.png";
import brand2 from "../assets/clients/fa-brands-2.png";
import brand3 from "../assets/clients/fa-brands-3.png";
import brand4 from "../assets/clients/fa-brands-4.png";
import brand5 from "../assets/clients/fa-brands-5.png";
import brand6 from "../assets/clients/fa-brands-6.png";

export default function Clients() {
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

  return (
    <section className="bg-lightGray py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 opacity-60 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={brand}
                alt={`Brand ${index + 1}`}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
