"use client";

import * as React from "react";
import { Check } from "lucide-react";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useIngredientStore } from "~/store/store";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";

interface Input {
  name: string;
}

export function ComboboxDemo({
  ingredients,
}: {
  ingredients: RouterOutputs["ingredientsRouter"]["getAllIngredients"][number][];
}) {
  const utils = api.useUtils();
  const methods = useForm<Input>({ mode: "onChange" });
  const { register, handleSubmit, getValues } = methods;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const chosedIngredients = useIngredientStore((state) => state.addIngredient);
  const ingredientsIds = useIngredientStore((state) => state.ingredients);
  const { mutate: addIngredient } =
    api.ingredientsRouter.addNewIngredient.useMutation({
      onSuccess() {
        utils.ingredientsRouter.getAllIngredients.invalidate();
      },
    });
  const onSubmit: SubmitHandler<Input> = (data) =>
    addIngredient({ name: data.name });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addIngredient({ name: getValues("name") });
    }
  };
  return (
    <Select>
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder="Select ingredients" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="h-[150px] overflow-y-scroll">
              <CommandItem>
                <form
                  className="flex justify-between"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    {...register("name", { required: true })}
                    className="z-10"
                    placeholder="Add new"
                    onKeyDown={handleKeyDown}
                  />

                  <Button className="ml-2">
                    <Check className="h-4 w-4 opacity-100" />
                  </Button>
                </form>
              </CommandItem>

              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient.id}
                  value={ingredient.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    chosedIngredients(ingredient.id);
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
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
