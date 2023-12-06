import React from "react";
import { RecipeSearch } from "../../_components/RecipeSearch";
import { SortSelect } from "../../_components/SortSelect";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex gap-4">
        <RecipeSearch />
        <SortSelect />
      </div>
      {children}
    </div>
  );
}
