import React from "react";
import EditorsPick from "../components/EditorsPick";
import NewCollection from "../components/NewCollection";
import BestSeller from "../components/BestSeller";

export default function PageContent() {
  return (
    <div className="w-screen">
      <NewCollection></NewCollection>
      <EditorsPick></EditorsPick>
      <BestSeller></BestSeller>
    </div>
  );
}
