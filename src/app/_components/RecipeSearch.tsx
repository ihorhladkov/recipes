"use client";

import React from "react";
import { Input } from "../_components/ui/input";
import { useSearchStore } from "~/store/searchStore";

export const RecipeSearch = () => {
  const searchString = useSearchStore((state) => state.searchString);
  const findNew = useSearchStore((state) => state.findNew);

  const handeQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    findNew(event.target.value);
  };

  return (
    <Input
      value={searchString}
      className="mb-4 max-w-[350px]"
      type="text"
      placeholder="Search"
      onChange={handeQueryChange}
    />
  );
};
