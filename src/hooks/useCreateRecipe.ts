"use client";

import { toast } from "~/app/_components/ui/use-toast";
import { api } from "~/trpc/react";

export const useCreateRecipe = ({
  reset,
  setOpen,
}: {
  reset: () => void;
  setOpen: () => void;
}) => {
  const utils = api.useUtils();

  return api.recipesRouter.createNewRecipe.useMutation({
    onSuccess() {
      utils.recipesRouter.getAllRecipes.invalidate();
      utils.recipesRouter.getSortedRecipes.invalidate();
      reset();
      setOpen();
      toast({
        title: "Success",
        description: "The recipe was successfully added",
      });
    },
  });
};
