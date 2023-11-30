import { create } from "zustand";

// interface IBook {
//   amount: number;
//   updateAmount: (newAmount: number) => void;
// }

// export const useBookStore = create<IBook>((set, get) => ({
//   amount: 40,
//   updateAmount: (newAmount: number) => {
//     const amountState = get().amount;
//     set({ amount: amountState + newAmount });
//   },
// }));

interface Count {
  ingredients: string[];
  increase: (arrayOfIngredients: string) => void;
}

export const useCountStore = create<Count>((set) => ({
  ingredients: [],
  increase: (ingredients: string) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredients],
    })),
}));
