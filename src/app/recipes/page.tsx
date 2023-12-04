"use client";

import { api } from "~/trpc/react";
import Card from "../_components/Card";
import { useSearchStore } from "~/store/serchStore";

export default function RecipesPage() {
  const searchString = useSearchStore((state) => state.searchString);
  const [allRecipes] = api.recipesRouter.getAllRecipes.useSuspenseQuery(
    {
      search: searchString.trim(),
    },
    {
      keepPreviousData: true,
    },
  );
  return (
    <>
      <section className="flex flex-col items-center justify-center text-white">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {allRecipes.length === 0 && <p>Not Fount</p>}
          {allRecipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </>
  );
}
