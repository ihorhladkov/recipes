"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { RouterOutputs } from "~/trpc/shared";
import { useFieldArray, useFormContext } from "react-hook-form";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface Input {
  name: string;
}

export function Combobox({
  ingredients,
}: {
  ingredients: RouterOutputs["ingredientsRouter"]["getAllIngredients"][number][];
}) {
  const utils = api.useUtils();
  const [value, setValue] = React.useState("");
  // const [searchValue, setSearchValue] = React.useState("");
  const [newIngredient, setNewIngredinet] = React.useState("");

  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const { append, remove } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: "Ingredients are required.",
      minLength: {
        value: 3,
        message: "Must contain at list 3 items.",
      },
    },
  });

  const { mutate: addIngredient, isLoading } =
    api.ingredientsRouter.addNewIngredient.useMutation({
      onSuccess() {
        utils.ingredientsRouter.getAllIngredients.invalidate();
        toast({
          title: "Success",
          description: "The ingredinet was successfully added.",
        });
        setNewIngredinet("");
      },
      onError() {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      },
    });

  const isValid = () => {
    newIngredient.trim().match("^[a-zA-Z]+(?:[\\s'-][a-zA-Z]+)*$") !== null
      ? addIngredient({ name: newIngredient })
      : toast({
          title: "Error",
          description: "Invalid data, try again.",
        });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      isValid();
    }
  };

  const handleAddIngredinet = () => {
    isValid();
  };

  const toggleIngredinet = (ingredientId: string) => {
    const index = getValues().ingredients.findIndex(
      (elem: string) => ingredientId === elem,
    );

    if (index === -1) {
      append(ingredientId);
    } else {
      remove(index);
    }
  };

  return (
    <>
      <Select>
        <SelectTrigger className="w-[230px]">
          <SelectValue placeholder="Select ingredients" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <Command>
              <CommandInput placeholder="Search ingredient..." />
              <CommandEmpty>
                <p className="text-4 mb-4">No ingredients found</p>
                <div className="mx-3 flex">
                  <Input
                    value={newIngredient}
                    placeholder="Add new"
                    onChange={(e) => setNewIngredinet(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />

                  <Button className="ml-2" onClick={handleAddIngredinet}>
                    {isLoading ? (
                      <Loader2 className=" h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 opacity-100" />
                    )}
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup className="h-[150px] overflow-y-scroll">
                {ingredients.map((ingredient) => (
                  <CommandItem
                    key={ingredient.id}
                    value={ingredient.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      toggleIngredinet(ingredient.id);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        getValues().ingredients.includes(ingredient.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span className="text-[16px]">{ingredient.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </SelectGroup>
        </SelectContent>
      </Select>

      {errors.ingredients?.root?.message && (
        <p className="mb-2 text-red-600">
          {`${errors.ingredients?.root?.message}`}
        </p>
      )}
    </>
  );
}
