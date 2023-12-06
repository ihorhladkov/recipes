import { create } from "zustand";

interface Count {
  searchString: string;
  findNew: (newSearchString: string) => void;
}

export const useSearchStore = create<Count>((set) => ({
  searchString: "",
  findNew: (newSearchString) =>
    set(() => ({ searchString: newSearchString.trim() })),
}));
