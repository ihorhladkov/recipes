"use client";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function RecipeCard({ slug }: { slug: string }) {
  const [recipe] = api.recipesRouter.getOneRecipe.useSuspenseQuery({
    slug,
  });

//   if (isError) return <>Not Found</>;

  return (
    <Card className="mx-auto w-full max-w-[320px]">
      <CardHeader className="pb-3">
        <CardTitle>{recipe?.name}</CardTitle>
        <CardDescription>{recipe?.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 transition-all">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Description</p>
            <p className="text-sm text-muted-foreground">
              {recipe?.description}
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Category</p>
            <p className="text-sm text-muted-foreground">
              {recipe?.category?.name}
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 transition-all hover:text-accent-foreground">
          <div className="w-full">
            <p className="mb-6 text-sm font-medium uppercase leading-none">
              Ingredients
            </p>
            <div className="h-[80px] overflow-y-scroll">
              {recipe?.recipesToIngredients.map((ingedient) => (
                <div
                  key={ingedient.id}
                  className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {`${ingedient.ingredient.name} `}
                    </p>
                    <p className="text-sm text-muted-foreground"></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}