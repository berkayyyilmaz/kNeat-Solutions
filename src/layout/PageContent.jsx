import React from "react";
import EditorsPick from "../components/EditorsPick";
import NewCollection from "../components/NewCollection";
import BestSeller from "../components/BestSeller";
import Header from "./Header";
import Footer from "./Footer";

export default function PageContent({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
