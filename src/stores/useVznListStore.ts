import axios from 'axios';
import {create} from 'zustand';
import {produce} from 'immer';

import {VznItemProps} from '../interfaces/VizItemProps';
import {FilterProps} from '@/interfaces/FilterProps'

interface VznListState {
    vznList: VznItemProps[];
    loading: boolean;
    error: string | null;
    filters: FilterProps;
    updateFilters: (newFilters: Partial<FilterProps>) => void;
    fetchVznList: (token: string | null) => Promise<void>;
}

export const useVznListStore = create<VznListState>((set, get) => ({
    vznList: [],
    loading: false,
    error: null,
    filters: {
        Codes: [],
        Num: "23407",
        Sender: 0,
        Receiver: 0,
        Period: ""
    },

    updateFilters: (newFilters): void => {
        set((state) =>
            produce(state, (draft: VznListState) => {
                draft.filters = {...draft.filters, ...newFilters};
            })
        )
    },

    fetchVznList: async (token: string | null) => {
        set((state) =>
            produce(state, (draft: VznListState) => {
                draft.loading = true;
                draft.error = null;
            })
        );

        const filters = get().filters;

        try {
            const response = await axios.post('http://92.55.15.91:8225/stock/wsInplants.loadByFilter',
                {
                    authToken: token,
                    flt: filters
                },
            );

            const data: VznItemProps[] = response.data.wsInplants || [];
            console.log(filters)
            console.log(response)
            set((state) =>
                produce(state, (draft: VznListState) => {
                    draft.vznList = data;
                })
            );
        } catch {
            set((state) =>
                produce(state, (draft: VznListState) => {
                    draft.error = 'Ошибка загрузки данных ВЗН УП';
                })
            );
        } finally {
            set((state) =>
                produce(state, (draft: VznListState) => {
                    draft.loading = false;
                })
            );
        }
    },
}));
