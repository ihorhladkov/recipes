import { api } from "~/trpc/react";

import { useSearchStore } from "~/store/serchStore";

export const useGetRecipes = () => {
  const searchString = useSearchStore((state) => state.searchString);
  return api.recipesRouter.getAllRecipes.useSuspenseQuery(
    {
      search: searchString.trim(),
    },
    {
      keepPreviousData: true,
    },
  );
};
