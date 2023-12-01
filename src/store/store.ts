import { create } from "zustand";

interface Count {
  ingredients: string[];
  addIngredient: (arrayOfIngredients: string) => void;
  clearIngredients: () => void;
}

export const useIngredientStore = create<Count>((set) => ({
  ingredients: [],
  addIngredient: (ingredient: string) =>
    set((state) => ({
      ingredients: state.ingredients.includes(ingredient)
        ? state.ingredients.filter(
            (currentIngredient) => ingredient !== currentIngredient,
          )
        : [...state.ingredients, ingredient],
    })),
  clearIngredients: () => set({ ingredients: [] }),
}));
