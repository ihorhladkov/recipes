"use client";

import React from "react";
import { Input } from "../_components/ui/input";
import { useSearchStore } from "~/store/searchStore";

export const RecipeSearch = () => {
  const { searchString, handleSetPage } = useSearchStore((state) => state);
  const findNew = useSearchStore((state) => state.findNew);

  const handeQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    findNew(event.target.value);
    handleSetPage(1)
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
