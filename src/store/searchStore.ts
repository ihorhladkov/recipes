import { create } from "zustand";

interface Count {
  searchString: string;
  sortBy: string;
  elements: number;
  page: number;
  findNew: (newSearchString: string) => void;
  setSortBy: (newSortType: string) => void;
  setElements: (newElement: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  handleSetPage: (pageNumber: number) => void;
}

export const useSearchStore = create<Count>((set) => ({
  searchString: "",
  sortBy: "author",
  elements: 6,
  page: 1,
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  handleSetPage: (pageNumber) => set((state) => ({ page: pageNumber })),
  findNew: (newSearchString) =>
    set(() => ({ searchString: newSearchString.trim() })),
  setSortBy: (newSortType) => set(() => ({ sortBy: newSortType })),
  setElements: (newElements) => set(() => ({ elements: newElements })),
}));
