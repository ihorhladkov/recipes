"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RouterOutputs } from "~/trpc/shared";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useCountStore } from "~/store/store";

export function ComboboxDemo({
  ingredients,
}: {
  ingredients: RouterOutputs["ingredientsRouter"]["getAllIngredients"][number][];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const chosedIngredients = useCountStore(state => state.increase)
  const ingredientsIds = useCountStore(state => state.ingredients)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {ingredients.map((ingredient, index) => (
              <CommandItem
                key={ingredient.id}
                value={ingredient.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  // handeToggleIngredient(ingredient.id);
                  chosedIngredients(ingredient.id)
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    ingredientsIds.includes(ingredient.id)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {ingredient.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
