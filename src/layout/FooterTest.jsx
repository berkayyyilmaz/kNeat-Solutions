import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerInfo } from "../data/footerInfo";

export default function FooterTest() {
  return (
    <div>
      <div className="bg-primary">
        <div className="container mx-auto flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center 2xl:px-32">
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
        <div className="container mx-auto flex">
          <div className="">
            <div className="flex flex-col sm:flex-row">
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
            </div>
            <div className="mb-4 sm:mb-0">
              <h5 className="mb-4">Get In Touch</h5>
              <div className="flex w-10">
                <input
                  className="rounded-l-lg border p-4 focus:rounded-l-lg focus:rounded-r-none focus:border-secondary focus:outline-none focus:ring-secondary"
                  placeholder="Your email"
                />
                <button className="rounded-r-lg bg-secondary px-2 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className="py-10 text-center font-bold text-primary">
        Stargazer Inc.
      </h4>
    </div>
  );
}
