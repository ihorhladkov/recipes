"use client";

import React from "react";
import { Input } from "../_components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchStore } from "~/store/serchStore";

export const RecipeSearch = () => {
  const searchString = useSearchStore((state) => state.searchString);
  console.log(searchString, "searchString");
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
