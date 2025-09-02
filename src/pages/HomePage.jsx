import React from "react";
import NewCollection from "../components/NewCollection";
import EditorsPick from "../components/EditorsPick";
import BestSeller from "../components/BestSeller";
import CategoryList from "../components/CategoryList";
import PageContent from "../layout/PageContent";

export default function HomePage() {
  return (
    <PageContent>
      <NewCollection></NewCollection>
      <EditorsPick></EditorsPick>
      <CategoryList></CategoryList>
      <BestSeller></BestSeller>
    </PageContent>
  );
}
