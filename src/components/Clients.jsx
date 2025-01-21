import brand1 from "../assets/clients/fa-brands-1.png";
import brand2 from "../assets/clients/fa-brands-2.png";
import brand3 from "../assets/clients/fa-brands-3.png";
import brand4 from "../assets/clients/fa-brands-4.png";
import brand5 from "../assets/clients/fa-brands-5.png";
import brand6 from "../assets/clients/fa-brands-6.png";

export default function Clients() {
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

  return (
    <div className="bg-lightGray">
      <div className="container mx-auto border-b-2 py-10">
        <div className="flex flex-col justify-center gap-y-10 sm:flex-row lg:gap-x-20">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img src={brand} alt={`Brand ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
