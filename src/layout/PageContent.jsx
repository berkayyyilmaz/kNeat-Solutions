import React from "react";
import EditorsPick from "../components/EditorsPick";
import NewCollection from "../components/NewCollection";
import TestCards from "../components/TestCards";

export default function PageContent() {
  return (
    <div className="w-screen">
      <NewCollection></NewCollection>
      <EditorsPick></EditorsPick>
      <TestCards></TestCards>
    </div>
  );
}
