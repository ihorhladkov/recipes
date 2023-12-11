import { api } from "~/trpc/react";
import { useSearchStore } from "~/store/searchStore";

export const useGetRecipes = () => {
  const { searchString, sortBy, elements, page } = useSearchStore(
    (state) => state,
  );

  return api.recipesRouter.getAllRecipes.useSuspenseQuery(
    {
      search: searchString,
      sortBy,
      elements,
      page,
    },
    {
      keepPreviousData: true,
    },
  );
};
