"use client";

import React from "react";

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
import { ErrorMessage } from "@hookform/error-message";

export function SelectScrollable({
  categories,
}: {
  categories: RouterOutputs["categoriesRouter"]["getCategory"][number][];
}) {
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Select
        onValueChange={(value) =>
          setValue("categoryId", value, { shouldValidate: true })
        }
      >
        <SelectTrigger className="w-[230px]">
          <SelectValue
            {...register("categoryId", { required: "Category is required." })}
            placeholder="Select a category"
          />
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

      <ErrorMessage
        errors={errors}
        name="categoryId"
        render={({ message }) => <p className="mb-2 text-red-600">{message}</p>}
      />
    </>
  );
}
