import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  isResultsModalOpen: boolean;
  selectedVznId: number | null;
  openVznModal: (VznId: number) => void;
  openModal: () => void;
  closeModal: () => void;
  openResultsModal: () => void;
  closeResultsModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  isResultsModalOpen: false,

  selectedVznId: null,
  
  openVznModal: (VznId: number) => set({ isModalOpen: true, selectedVznId: VznId }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedVznId: null }),
  
  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),
}));