import { toast } from "~/app/_components/ui/use-toast";
import { api } from "~/trpc/react";

export const useAddIngredinet = ({
  setNewIngredinet,
}: {
  setNewIngredinet: () => void;
}) => {
  const utils = api.useUtils();

  return api.ingredientsRouter.addNewIngredient.useMutation({
    onSuccess() {
      utils.ingredientsRouter.getAllIngredients.invalidate();
      setNewIngredinet();
      toast({
        title: "Success",
        description: "The ingredinet was successfully added.",
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
