"use client";
import { api } from "~/trpc/react";
import Card from "../_components/Card";

export default function RecipesPage() {
  const [allRecipes] = api.recipesRouter.getAllRecipes.useSuspenseQuery();
  return (
    <>
      <section className="flex flex-col items-center justify-center text-white">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {allRecipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </>
  );
}
