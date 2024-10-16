import { create } from 'zustand';

interface PaginationState {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  itemsPerPage: 1,
  currentPage: 1,
  totalPages: 1,
  setPage: (page: number) => {
    const { totalPages } = get();
    if (page >= 1 && page <= totalPages) {
      set({ currentPage: page });
    }
  },
  setItemsPerPage: (itemsPerPage: number) => set({ itemsPerPage }),
  setTotalPages: (totalPages: number) => set({ totalPages }),
}));