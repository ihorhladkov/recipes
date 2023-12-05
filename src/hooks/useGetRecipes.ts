import { api } from "~/trpc/react";
import { useSearchStore } from "~/store/serchStore";
import { useDebounce } from "@uidotdev/usehooks";

export const useGetRecipes = () => {
  const searchString = useSearchStore((state) => state.searchString);
  const debouncedSearchTerm = useDebounce(searchString, 500);
  return api.recipesRouter.getAllRecipes.useSuspenseQuery(
    {
      search: debouncedSearchTerm.trim(),
    },
    {
      keepPreviousData: true,
    },
  );
};
