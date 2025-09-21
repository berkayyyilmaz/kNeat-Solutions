import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerInfo } from "../data/footerInfo";
import InputWithButton from "../components/InputWithButton";
import { STRINGS } from "../constants/strings";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      {/* Top Footer Section */}
      <section className="bg-lightGray py-8 sm:py-10">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center sm:gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/kneat-logo2.png"
                alt="kNeat"
                className="h-24 w-auto sm:h-20 md:h-24 lg:h-28"
              />
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <button className="rounded-full p-2 text-secondary transition-colors hover:bg-white/50 hover:text-primary">
                <Facebook size={24} className="sm:h-5 sm:w-5" />
              </button>
              <button className="rounded-full p-2 text-secondary transition-colors hover:bg-white/50 hover:text-primary">
                <Twitter size={24} className="sm:h-5 sm:w-5" />
              </button>
              <button className="rounded-full p-2 text-secondary transition-colors hover:bg-white/50 hover:text-primary">
                <Instagram size={24} className="sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="py-12 sm:py-16">
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
                {STRINGS.FOOTER.NEWSLETTER_TITLE}
              </h5>
              <p className="mb-4 text-sm text-fgray">
                {STRINGS.FOOTER.NEWSLETTER_P}
              </p>
              <InputWithButton
                placeholder={STRINGS.FOOTER.NEWSLETTER_PLACEHOLDER}
                buttonText={STRINGS.FOOTER.NEWSLETTER_BUTTON}
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
              . {STRINGS.FOOTER.COPYRIGHT_SUFFIX}
            </p>
            <p className="text-sm text-fgray">
              {STRINGS.FOOTER.DESIGNED_BY}{" "}
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
