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
    counter: number
    increase: () => void
}

export const useCountStore = create<Count>((set) => ({
    counter: 1,
    increase: () => set((state) => ({counter: state.counter + 1}))
}))
