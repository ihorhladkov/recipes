"use client";

import { useGetRecipes } from "~/hooks/useGetRecipes";
import Card from "../../_components/Card";
import NoResult from "../../_components/NoResult";

export default function RecipesPage() {
  const [allRecipes] = useGetRecipes();

  return (
    <>
      <section className="flex flex-col items-center justify-center text-white">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {allRecipes.length === 0 ? (
            <NoResult />
          ) : (
            allRecipes.map((recipe) => <Card key={recipe.id} recipe={recipe} />)
          )}
        </div>
      </section>
    </>
  );
}
