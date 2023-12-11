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
import { useSearchStore } from "~/store/searchStore";

export function ShowItemSelect() {
  const { setElements, elements } = useSearchStore((state) => state);

  return (
    <Select
      value={`${elements}`}
      onValueChange={(value) => setElements(+value)}
      
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Items on page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items</SelectLabel>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="6">6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
