"use client";

import React from "react";
import debounce from "debounce";
import { Input } from "../_components/ui/input";
import { useSearchStore } from "~/store/serchStore";

export const RecipeSearch = () => {
  const searchString = useSearchStore((state) => state.searchString);
  const findNew = useSearchStore((state) => state.findNew);

  const handeQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    findNew(event.target.value);
  };
  return (
    <Input
      defaultValue={searchString}
      className="mb-4 max-w-[350px]"
      type="text"
      placeholder="Search"
      onChange={debounce(handeQueryChange, 500)}
    />
  );
};
