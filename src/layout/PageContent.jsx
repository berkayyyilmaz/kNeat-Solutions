import React from "react";
import EditorsPick from "../components/EditorsPick";
import NewCollection from "../components/NewCollection";

export default function PageContent() {
  return (
    <div>
      <NewCollection></NewCollection>
      <EditorsPick></EditorsPick>
    </div>
  );
}
