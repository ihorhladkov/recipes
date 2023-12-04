import React from "react";
import { RecipeSearch } from "../_components/RecipeSearch";

export default function layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div>
      <RecipeSearch />
      {children}
    </div>
  );
}
