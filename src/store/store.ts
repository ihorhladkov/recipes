import { create } from "zustand";
interface Count {
  ingredients: string[];
  increase: (arrayOfIngredients: string) => void;
}

export const useCountStore = create<Count>((set) => ({
  ingredients: [],
  increase: (ingredient: string) =>
    set((state) => ({
      ingredients: state.ingredients.includes(ingredient)
        ? state.ingredients.filter(
            (currentIngredient) => ingredient !== currentIngredient,
          )
        : [...state.ingredients, ingredient],
    })),
}));
