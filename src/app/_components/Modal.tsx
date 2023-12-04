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
import { ErrorMessage } from "@hookform/error-message";

interface Inputs {
  name: string;
  author: string;
  short_description: string;
  full_description: string;
  categoryId: string;
  ingredients: {
    name: string;
  }[];
}

const initialData = {
  name: "",
  author: "",
  short_description: "",
  full_description: "",
  categoryId: "",
  ingredients: [],
};

export function Modal() {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const methods = useForm<Inputs>({
    defaultValues: {
      name: "",
      author: "",
      short_description: "",
      full_description: "",
      categoryId: "",
      ingredients: [],
    },
  });

  const { data: categories } = api.categoriesRouter.getCategory.useQuery();

  const clearIngredients = useIngredientStore(
    (state) => state.clearIngredients,
  );

  const { mutate: createRecipe, isLoading } =
    api.recipesRouter.createNewRecipe.useMutation({
      onSuccess() {
        utils.recipesRouter.getAllRecipes.invalidate();
        utils.recipesRouter.getSortedRecipes.invalidate();
        reset(initialData);
        clearIngredients();
        setOpen(false);
      },
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = methods;

  const { data: ingredients } =
    api.ingredientsRouter.getAllIngredients.useQuery();
  const ingredientsIds = useIngredientStore((state) => state.ingredients);

  console.log(getValues());

  if (!categories || !ingredients) {
    return <>Loading...</>;
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createRecipe({
      name: data.name,
      shortDescription: data.short_description,
      description: data.full_description,
      author: data.author,
      ingredients: ingredientsIds,
      categoryId: data.categoryId,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        reset(initialData);
      }}
    >
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
              <div>
                <div className="col-span-3">
                  <Label htmlFor="name">Recipe Name</Label>
                  <Input
                    {...register("name", {
                      required: "This name is requierd.",
                    })}
                    id="name"
                    defaultValue=""
                    placeholder="Enter title of your recipe"
                    className="col-span-3"
                  />

                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <p className="mb-2 text-red-600">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-3">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    {...register("author", {
                      required: "This author name is requierd.",
                    })}
                    id="name"
                    defaultValue=""
                    placeholder="What is your name?"
                    className="col-span-3"
                  />

                  <ErrorMessage
                    errors={errors}
                    name="author"
                    render={({ message }) => (
                      <p className="mb-2 text-red-600">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-3">
                  <Label htmlFor="short_description">Short description</Label>
                  <Textarea
                    {...register("short_description", {
                      required: "This short description is requierd.",
                    })}
                    className="col-span-3"
                    placeholder="Write short description of your recipe"
                  />

                  <ErrorMessage
                    errors={errors}
                    name="short_description"
                    render={({ message }) => (
                      <p className="mb-2 text-red-600">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-3">
                  <Label htmlFor="name">Full description</Label>
                  <Textarea
                    {...register("full_description", {
                      required: "This full description is requierd.",
                    })}
                    className="col-span-3"
                    placeholder="Write full description of your recipe"
                  />

                  <ErrorMessage
                    errors={errors}
                    name="full_description"
                    render={({ message }) => (
                      <p className="mb-2 text-red-600">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-3">
                  <Label htmlFor="name">Ingredients</Label>
                  <div className="col-span-3">
                    <ComboboxDemo ingredients={ingredients} />
                  </div>
                </div>

                <div className="col-span-3">
                  <Label htmlFor="name">Categories</Label>
                  <SelectScrollable categories={categories} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">
                {isLoading ? "Submiting..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
