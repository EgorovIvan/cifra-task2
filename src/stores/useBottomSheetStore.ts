import {create} from 'zustand';

interface BoxState {
    yPosition: number;
    appHeight: number;
    wrapperHeight: number
    isTouchUp: boolean;
    setYPosition: (y: number) => void;
    setAppHeight: (height: number) => void;
    setWrapperHeight: (height: number) => void;
    setIsTouchUp: (b: boolean) => void;
}

export const useBottomSheetStore = create<BoxState>((set) => ({
    yPosition: 1000,
    appHeight: window.innerHeight + 10,
    wrapperHeight: 0,
    isTouchUp: true,
    setYPosition: (y) => set({ yPosition: y }),
    setAppHeight: (height) => set({ appHeight: height }),
    setWrapperHeight: (height) => set({ wrapperHeight: height }),
    setIsTouchUp: (b) => set({ isTouchUp: b }),
}));
