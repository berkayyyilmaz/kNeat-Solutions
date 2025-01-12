import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerInfo } from "../data/footerInfo";

export default function Footer() {
  return (
    <div>
      <div className="bg-[#FAFAFA]">
        <div className="container flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
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
      <div className="container mx-auto">
        <div className="px-10 py-12 sm:px-0">
          <div className="flex max-w-screen-xl flex-col flex-wrap sm:mx-auto sm:flex-row sm:justify-start sm:gap-16 xl:flex-nowrap">
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

            <div className="mb-4 sm:mb-0">
              <h5 className="mb-4">Get In Touch</h5>
              <div className="flex">
                <input
                  className="w-52 rounded-l-lg border p-4 focus:rounded-l-lg focus:rounded-r-none focus:border-secondary focus:outline-none focus:ring-secondary"
                  placeholder="Your email"
                />
                <button className="w-28 rounded-r-lg bg-secondary px-2 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className="flex justify-center py-10 font-bold text-primary">
        Stargazer Inc.
      </h4>
    </div>
  );
}
