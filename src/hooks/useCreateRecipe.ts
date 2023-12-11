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
      reset();
      setOpen();
      toast({
        title: "Success",
        description: "The recipe was successfully added",
      });
    },
    
    onError() {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};
