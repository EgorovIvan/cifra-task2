import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  isFilterModalOpen: boolean
  isResultsModalOpen: boolean;
  isScanModalOpen: boolean;
  isCreateVznModalOpen: boolean;
  selectedVznId: number | null;
  openVznModal: (Code: number) => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  openResultsModal: () => void;
  closeResultsModal: () => void;
  openScanModal: () => void;
  closeScanModal: () => void;
  openCreateVznModal: () => void;
  closeCreateVznModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  isFilterModalOpen: false,
  isResultsModalOpen: false,
  isScanModalOpen: false,
  isCreateVznModalOpen: false,
  selectedVznId: null,

  openVznModal: (VznId: number) => set({ isModalOpen: true, selectedVznId: VznId }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedVznId: null }),

  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false, selectedVznId: null }),

  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),

  openScanModal: () => set({ isScanModalOpen: true }),
  closeScanModal: () => set({ isScanModalOpen: false }),

  openCreateVznModal: () => set({ isCreateVznModalOpen: true }),
  closeCreateVznModal: () => set({ isCreateVznModalOpen: false })
}));
