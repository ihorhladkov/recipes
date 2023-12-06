import { api } from "~/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchStore } from "~/store/searchStore";

export const useGetRecipes = () => {
  const {searchString, sortBy} = useSearchStore((state) => state);
  const debouncedSearchTerm = useDebounce(searchString, 500);
  return api.recipesRouter.getAllRecipes.useSuspenseQuery(
    {
      search: debouncedSearchTerm.trim(),
      sortBy,
    },
    {
      keepPreviousData: true,
    },
  );
};
