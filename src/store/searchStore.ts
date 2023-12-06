import { create } from "zustand";

interface Count {
  searchString: string;
  sortBy: string;
  setSortBy: (newSortType: string) => void;
  findNew: (newSearchString: string) => void;
}

export const useSearchStore = create<Count>((set) => ({
  searchString: "",
  sortBy: "",
  findNew: (newSearchString) =>
    set(() => ({ searchString: newSearchString.trim() })),
  setSortBy: (newSortType) => set(() => ({ sortBy: newSortType })),
}));
