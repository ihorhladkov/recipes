"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SortBy, SortSchema, useSearchStore } from "~/store/searchStore";

export function SortSelect() {
  const setSortType = useSearchStore((state) => state.setSortBy);

  return (
    <Select
      defaultValue="author"
      onValueChange={(value: SortBy) => setSortType(SortSchema.parse(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select type of sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="createdAt">Creation date</SelectItem>
          <SelectItem value="name">Recipe name</SelectItem>
          <SelectItem value="author">Author</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
