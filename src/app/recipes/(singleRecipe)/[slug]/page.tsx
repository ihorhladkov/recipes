"use client";

import { Suspense } from "react";
import { RecipeCard } from "~/app/_components/RecipeCard";
import { RecipeCardSkeleton } from "~/app/_components/RecipeCardSkeleton";

export default function RecipeDetails({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <h1 className="my-12 animate-pulse text-center text-6xl uppercase text-purple-100">
        Recipe Information
      </h1>
      <Suspense fallback={<RecipeCardSkeleton />}>
        <RecipeCard slug={params.slug} />
      </Suspense>
    </>
  );
}
