import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  selectedVznId: number | null;
  openVznModal: (VznId: number) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  selectedVznId: null,
  openVznModal: (VznId: number) => set({ isModalOpen: true, selectedVznId: VznId }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedVznId: null }),
}));