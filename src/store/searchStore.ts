import { z } from "zod";
import { create } from "zustand";

export const SortSchema = z
  .enum(["author", "createdAt", "name"])
  .default("author");
export type SortBy = z.infer<typeof SortSchema>;

interface Count {
  searchString: string;
  sortBy: SortBy;
  elements: number;
  page: number;
  findNew: (newSearchString: string) => void;
  setSortBy: (newSortType: SortBy) => void;
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
  handleSetPage: (pageNumber) => set(() => ({ page: pageNumber })),
  findNew: (newSearchString) =>
    set(() => ({ searchString: newSearchString.trim() })),
  setSortBy: (newSortType) => set(() => ({ sortBy: newSortType })),
  setElements: (newElements) => set(() => ({ elements: newElements })),
}));
