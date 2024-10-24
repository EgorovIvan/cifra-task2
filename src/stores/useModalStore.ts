import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  isModalFilterOpen: boolean
  isResultsModalOpen: boolean;
  isScanModalOpen: boolean;
  selectedVznId: number | null;
  openVznModal: (Code: number) => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  openResultsModal: () => void;
  closeResultsModal: () => void;
  openScanModal: () => void;
  closeScanModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  isModalFilterOpen: false,
  isResultsModalOpen: false,
  isScanModalOpen: false,
  selectedVznId: null,

  openVznModal: (VznId: number) => set({ isModalOpen: true, selectedVznId: VznId }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedVznId: null }),

  openFilterModal: () => set({ isModalFilterOpen: true }),
  closeFilterModal: () => set({ isModalFilterOpen: false, selectedVznId: null }),

  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),

  openScanModal: () => set({ isScanModalOpen: true }),
  closeScanModal: () => set({ isScanModalOpen: false })
}));
