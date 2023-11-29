"use client";

import Card from "./_components/Card";
import { api } from "~/trpc/react";
import { CardSkeleton } from "./_components/CardSkeleton";

// import { useCountStore } from "~/store/store";

export default function Home() {
  // const counter = useCountStore((state) => state.counter);
  // const increase = useCountStore((state) => state.increase);
  // const form = useForm();
  // const { data } = api.categories.greeting.useQuery();

  // const { data: recipes } = api.categoriesRouter.getCategory.useQuery();
  const [recipeData] = api.recipesRouter.getSortedRecipes.useSuspenseQuery();

  return (
    <>
    {/* <CardSkeleton /> */}
      <main className="flex flex-col items-center justify-center text-white">
        {/* <h1>Books: {counter} </h1> */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {recipeData?.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
        {/* <Button onClick={increase}>Add amount</Button> */}
      </main>
    </>
  );
}
