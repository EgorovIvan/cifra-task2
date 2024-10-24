import { DivisionInputType } from '@/components/Filter/Filter';
import { create } from 'zustand';

interface ModalState {
  isFilterModalOpen: boolean;
  isResultsModalOpen: boolean;
  isScanModalOpen: boolean;
  isDivisionsModalOpen: boolean;
  selectedVznId: number | null;
  openVznModal: (VznId: number) => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  openResultsModal: () => void;
  closeResultsModal: () => void;
  openScanModal: () => void;
  closeScanModal: () => void;
  openDivisionsModal: (type: DivisionInputType) => void;
  closeDivisionsModal: () => void;
  divisionInputType?: DivisionInputType;
}

export const useModalStore = create<ModalState>((set) => ({
  isFilterModalOpen: false,
  isResultsModalOpen: false,
  isScanModalOpen: false,
  isDivisionsModalOpen: false,
  selectedVznId: null,

  openVznModal: (VznId: number) => set({ isModalOpen: true, selectedVznId: VznId }),
  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false, selectedVznId: null }),

  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),

  openScanModal: () => set({ isScanModalOpen: true }),
  closeScanModal: () => set({ isScanModalOpen: false }),

  openDivisionsModal: (type: DivisionInputType) => set({ isDivisionsModalOpen: true, divisionInputType: type }),
  closeDivisionsModal: () => set({ isDivisionsModalOpen: false })
}));
