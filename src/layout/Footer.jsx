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
      <div>blackity</div>
      <div></div>
    </div>
  );
}
