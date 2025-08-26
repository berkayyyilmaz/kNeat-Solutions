import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerInfo } from "../data/footerInfo";
import InputWithButton from "../components/InputWithButton";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      {/* Top Footer Section */}
      <section className="bg-lightGray py-8">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800 md:text-3xl">
              kNeat
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <button className="rounded-full p-2 text-secondary transition-colors hover:bg-white/50 hover:text-primary">
                <Facebook size={20} />
              </button>
              <button className="rounded-full p-2 text-secondary transition-colors hover:bg-white/50 hover:text-primary">
                <Twitter size={20} />
              </button>
              <button className="rounded-full p-2 text-secondary transition-colors hover:bg-white/50 hover:text-primary">
                <Instagram size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {/* Footer Links */}
            {footerInfo.map((section, index) => (
              <div key={index} className="space-y-4">
                <h5 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h5>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-sm text-fgray transition-colors hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Section */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-2">
              <h5 className="text-lg font-semibold text-gray-900">
                Get In Touch
              </h5>
              <p className="mb-4 text-sm text-fgray">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <InputWithButton
                placeholder="Your Email"
                buttonText="Subscribe"
                inputClassName="flex-1 min-w-0"
                buttonClassName="px-6 py-2 bg-primary text-white hover:bg-primary/90 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <section className="border-t border-gray-200 bg-lightGray py-6">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-fgray">
              © 2024{" "}
              <span className="font-semibold text-primary">
                kNeat Solutions
              </span>
              . All rights reserved.
            </p>
            <p className="text-sm text-fgray">
              Designed & Developed by{" "}
              <a
                href="https://byilmaz.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-secondary transition-colors hover:text-primary"
              >
                Berkay Yılmaz
              </a>
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
