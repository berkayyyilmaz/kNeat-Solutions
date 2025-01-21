import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerInfo } from "../data/footerInfo";
import InputWithButton from "../components/InputWithButton";

export default function FooterTest() {
  return (
    <footer>
      <div className="bg-lightGray">
        <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center 2xl:px-36">
          <div className="text-3xl font-bold text-gray-800">kNeat</div>
          <div className="flex space-x-4">
            <button>
              <Facebook />
            </button>
            <button>
              <Twitter />
            </button>
            <button>
              <Instagram />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-x-12 px-4 py-8 sm:grid-cols-4 md:grid-cols-6 lg:px-0">
            {footerInfo.map((section, index) => (
              <div key={index} className="mb-4">
                <h5 className="mb-4">{section.title}</h5>
                {section.links.map((link, idx) => (
                  <p key={idx} className="text">
                    {link}
                  </p>
                ))}
              </div>
            ))}
            <div className="flex-col sm:col-span-2">
              <h5 className="mb-4">Get In Touch</h5>
              <InputWithButton
                placeholder="Your Mail"
                buttonText="Subscribe"
                inputClassName="w-42 sm:w-36 lg:w-48"
                buttonClassName="w-24 "
              />
            </div>
          </div>
        </div>
      </div>
      <h4 className="bg-lightGray py-10 text-center font-bold text-primary">
        Stargazer Inc.
      </h4>
    </footer>
  );
}
