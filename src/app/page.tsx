"use client";

import Card from "./_components/Card";
import { api } from "~/trpc/react";

export default function Home() {
  const [recipeData] = api.recipesRouter.getSortedRecipes.useSuspenseQuery();

  return (
    <>
      <section className="flex flex-col items-center justify-center text-white">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {recipeData?.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </>
  );
}
