import React from "react";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagram.svg";

export default function Footer() {
  return (
    <div>
      <div className="flex h-32 flex-col justify-center gap-4 bg-[#FAFAFA] pl-10 sm:flex-row sm:items-center sm:justify-between sm:px-32">
        <div className="font-bold">kneat</div>
        <div className="flex space-x-4">
          <button>
            <FacebookIcon />
          </button>
          <button>
            <TwitterIcon />
          </button>
          <button>
            <InstagramIcon />
          </button>
        </div>
      </div>
      <div className="px-10 py-12">
        <div className="flex w-full flex-col flex-wrap sm:flex-row sm:justify-center sm:gap-32">
          <div className="mb-4">
            <h5 className="mb-4">Company Info</h5>
            <p className="text">About Us</p>
            <p>Carrier</p>
            <p>We are Hiring</p>
            <p>Blog</p>
          </div>
          <div className="mb-4">
            <h5 className="mb-4">Company Info</h5>
            <p className="text">About Us</p>
            <p>Carrier</p>
            <p>We are Hiring</p>
            <p>Blog</p>
          </div>
          <div className="mb-4">
            <h5 className="mb-4">Company Info</h5>
            <p className="text">About Us</p>
            <p>Carrier</p>
            <p>We are Hiring</p>
            <p>Blog</p>
          </div>
          <div className="mb-4">
            <h5 className="mb-4">Company Info</h5>
            <p className="text">About Us</p>
            <p>Carrier</p>
            <p>We are Hiring</p>
            <p>Blog</p>
          </div>
          <div className="mb-4">
            <h5 className="mb-4">Company Info</h5>
            <p className="text">About Us</p>
            <p>Carrier</p>
            <p>We are Hiring</p>
            <p>Blog</p>
          </div>
          <div className="mb-4">
            <h5>Get In Touch</h5>
            input
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
