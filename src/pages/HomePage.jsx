import React from "react";
import NewCollection from "../components/NewCollection";
import EditorsPick from "../components/EditorsPick";
import BestSeller from "../components/BestSeller";
import PageContent from "../layout/PageContent";

export default function HomePage() {
  return (
    <PageContent>
      <NewCollection></NewCollection>
      <EditorsPick></EditorsPick>
      <BestSeller></BestSeller>
    </PageContent>
  );
}
