"use client";

import { RecipeCard } from "~/app/_components/RecipeCard";

export default function RecipeDetails({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <RecipeCard slug={params.slug} />
    </>
  );
}
