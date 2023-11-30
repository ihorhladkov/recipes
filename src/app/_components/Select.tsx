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
import { RouterOutputs } from "~/trpc/shared";
import { useFormContext } from "react-hook-form";

export function SelectScrollable({
  categories,
}: {
  categories: RouterOutputs["categoriesRouter"]["getCategory"][number][];
}) {
  const { setValue } = useFormContext();
  return (
    <Select onValueChange={(value) => setValue("categoryId", value)}>
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
