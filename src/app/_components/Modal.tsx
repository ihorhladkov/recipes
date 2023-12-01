"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { api } from "~/trpc/react";
import { SelectScrollable } from "./Select";
import { ComboboxDemo } from "./Combobox";
import { useIngredientStore } from "~/store/store";
import { useState } from "react";

interface Inputs {
  name: string;
  author: string;
  short_description: string;
  full_description: string;
  categoryId: string;
  ingredients: string[];
}

export function Modal() {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const methods = useForm<Inputs>();

  const { data: categories } = api.categoriesRouter.getCategory.useQuery();

  const clearIngredients = useIngredientStore(
    (state) => state.clearIngredients,
  );

  const { mutate: createRecipe } =
    api.recipesRouter.createNewRecipe.useMutation({
      onSuccess() {
        utils.recipesRouter.getAllRecipes.invalidate();
        utils.recipesRouter.getSortedRecipes.invalidate();
        reset({
          name: "",
          author: "",
          short_description: "",
          full_description: "",
          categoryId: "",
          ingredients: [],
        });
        clearIngredients();
        setOpen(false)
      },
    });

  const { data: ingredients } =
    api.ingredientsRouter.getAllIngredients.useQuery();
  const ingredientsIds = useIngredientStore((state) => state.ingredients);

  if (!categories || !ingredients) {
    return <>1</>;
  }

  const { register, handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    // console.log(data);
    createRecipe({
      name: data.name,
      shortDescription: data.short_description,
      description: data.full_description,
      author: data.author,
      ingredients: ingredientsIds,
      categoryId: data.categoryId,
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Recipe</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Recipe Name</Label>
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  defaultValue=""
                  placeholder="Enter title of your recipe"
                  className="col-span-3"
                />
                <Label htmlFor="author">Author Name</Label>
                <Input
                  {...register("author", { required: true })}
                  id="name"
                  defaultValue=""
                  placeholder="What is your name?"
                  className="col-span-3"
                />
                <Label htmlFor="short_description">Short description</Label>
                <Textarea
                  {...register("short_description", { required: true })}
                  className="col-span-3"
                  placeholder="Write short description of your recipe"
                />

                <Label htmlFor="name">Full description</Label>
                <Textarea
                  {...register("full_description", { required: true })}
                  className="col-span-3"
                  placeholder="Write full description of your recipe"
                />

                <Label htmlFor="name">Ingredients</Label>
                <div className="col-span-3">
                  <ComboboxDemo ingredients={ingredients} />
                </div>

                <Label htmlFor="name">Categories</Label>
                <SelectScrollable categories={categories} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
