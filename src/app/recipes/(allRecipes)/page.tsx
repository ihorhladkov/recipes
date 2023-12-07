"use client";

import { useGetRecipes } from "~/hooks/useGetRecipes";
import Card from "../../_components/Card";
import NoResult from "../../_components/NoResult";
import Pagination from "~/app/_components/Pagination";

export default function RecipesPage() {
  const [allRecipes] = useGetRecipes();

  return (
    <>
      <section className="flex flex-col items-center justify-center text-white">
        <div className="mb-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {allRecipes.count === 0 ? (
            <NoResult />
          ) : (
            allRecipes.data.map((recipe) => (
              <Card key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
        <Pagination totalPage={allRecipes.totalPage} />
      </section>
    </>
  );
}
