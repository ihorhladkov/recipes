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
import { Combobox } from "./Combobox";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "./ui/use-toast";
import { createSlug } from "../utils/slugGenerate";

interface Inputs {
  name: string;
  author: string;
  short_description: string;
  full_description: string;
  categoryId: string;
  ingredients: string[];
  slug: string;
}

const initialData = {
  name: "",
  author: "",
  short_description: "",
  full_description: "",
  categoryId: "",
  ingredients: [],
  slug: "",
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
      slug: "",
    },
  });

  const [categories] = api.categoriesRouter.getCategory.useSuspenseQuery();

  const { mutate: createRecipe, isLoading } =
    api.recipesRouter.createNewRecipe.useMutation({
      onSuccess() {
        utils.recipesRouter.getAllRecipes.invalidate();
        utils.recipesRouter.getSortedRecipes.invalidate();
        reset(initialData);
        setOpen(false);
        toast({
          title: "Success",
          description: "The recipe was successfully added",
        });
      },
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [ingredients] =
    api.ingredientsRouter.getAllIngredients.useSuspenseQuery();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createRecipe({
      name: data.name,
      shortDescription: data.short_description,
      description: data.full_description,
      author: data.author,
      ingredients: data.ingredients,
      categoryId: data.categoryId,
      slug: createSlug(data.name),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
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
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message: "Name must contain only English letters",
                      },
                      minLength: {
                        value: 3,
                        message: "Must have at list 3 letters",
                      },
                    })}
                    id="name"
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
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message:
                          "Author name must contain only English letters",
                      },
                      minLength: {
                        value: 3,
                        message: "Must have at list 3 letters",
                      },
                    })}
                    id="author"
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
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message:
                          "Description must contain only English letters.",
                      },
                      minLength: {
                        value: 10,
                        message: "Must have at list 20 letters.",
                      },
                    })}
                    className="col-span-3 resize-none"
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
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message:
                          "Description must contain only English letters.",
                      },
                      minLength: {
                        value: 10,
                        message: "Must have at list 20 letters.",
                      },
                    })}
                    className="col-span-3 resize-none"
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
                    <Combobox ingredients={ingredients} />
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
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => reset(initialData)}
                >
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
