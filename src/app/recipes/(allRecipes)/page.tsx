"use client";

import { useGetRecipes } from "~/hooks/useGetRecipes";
import Card from "../../_components/Card";
import NoResult from "../../_components/NoResult";
import Pagination from "~/app/_components/Pagination";
import { Loader2 } from "lucide-react";
import { useSearchStore } from "~/store/searchStore";
import { Button } from "~/app/_components/ui/button";

export default function RecipesPage() {
  const [allRecipes, { isFetching }] = useGetRecipes();
  const { page, handleSetPage } = useSearchStore((state) => state);

  if (allRecipes.totalPage < page) {
    return (
      <div>
        This page does not exist. Return to first page?{" "}
        <Button onClick={() => handleSetPage(1)}>Return</Button>
      </div>
    );
  }
  return (
    <>
      <section className="flex flex-col items-center justify-center text-white">
        <div className="mb-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {isFetching && (
            <Loader2 className="absolute right-4 top-4 h-10 w-10 animate-spin" />
          )}

          {allRecipes.count === 0 ? (
            <NoResult />
          ) : (
            allRecipes.data.map((recipe) => (
              <Card key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
        <Pagination totalPage={allRecipes.totalPage} isFetching={isFetching} />
      </section>
    </>
  );
}
