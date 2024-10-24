import { create } from 'zustand';

interface ModalState {
  isFilterModalOpen: boolean;
  isResultsModalOpen: boolean;
  isScanModalOpen: boolean;
  selectedVznId: number | null;
  openVznModal: (VznId: number) => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  openResultsModal: () => void;
  closeResultsModal: () => void;
  openScanModal: () => void;
  closeScanModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isFilterModalOpen: false,
  isResultsModalOpen: false,
  isScanModalOpen: false,
  selectedVznId: null,

  openVznModal: (VznId: number) => set({ isModalOpen: true, selectedVznId: VznId }),
  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false, selectedVznId: null }),

  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),

  openScanModal: () => set({ isScanModalOpen: true }),
  closeScanModal: () => set({ isScanModalOpen: false })
}));
