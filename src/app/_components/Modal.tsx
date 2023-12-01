"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { api } from "~/trpc/react";
import { SelectScrollable } from "./Select";
import { ComboboxDemo } from "./Combobox";
import { useCountStore } from "~/store/store";

interface Inputs {
  name: string;
  author: string;
  short_description: string;
  full_description: string;
  categoryId: string;
  ingredients: string[];
}

export function Modal() {
  const utils = api.useUtils();
  const methods = useForm<Inputs>();
  const { data: categories } = api.categoriesRouter.getCategory.useQuery();
  const { mutate: createRecipe } =
    api.recipesRouter.createNewRecipe.useMutation();
  const { data: ingredients } =
    api.ingredientsRouter.getAllIngredients.useQuery();
  const ingredientsIds = useCountStore((state) => state.ingredients);

  if (!categories) {
    return <>1</>;
  }
  if (!ingredients) {
    return <>2</>;
  }

  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) =>
  // console.log(data)  
  createRecipe({
      name: data.name,
      shortDescription: data.short_description,
      description: data.full_description,
      author: data.author,
      ingredients: ingredientsIds,
      categoryId: data.categoryId,
    });
  return (
    <Dialog>
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
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  defaultValue=""
                  className="col-span-3"
                />
                <Label htmlFor="author">Recipe Name</Label>
                <Input
                  {...register("author")}
                  id="name"
                  defaultValue=""
                  className="col-span-3"
                />
                <Label htmlFor="short_description">Short description</Label>
                <Textarea
                  {...register("short_description")}
                  className="col-span-3"
                  placeholder="Write short description of your recipe"
                />

                <Label htmlFor="name">Full description</Label>
                <Textarea
                  {...register("full_description")}
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
