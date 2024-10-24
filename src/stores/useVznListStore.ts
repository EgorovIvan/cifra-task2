import axios from 'axios';
import { create } from 'zustand';
import { produce } from 'immer';

import { VznItemProps } from '../interfaces/VizItemProps';
import {FilterProps} from '@/interfaces/FilterProps'

interface VznListState {
  vznList: VznItemProps[];
  loading: boolean;
  error: string | null;
  fetchVznList: (token: string | null, filters: FilterProps) => Promise<void>;
}

export const useVznListStore = create<VznListState>((set) => ({
  vznList: [],
  loading: false,
  error: null,

  fetchVznList: async (token: string | null, filters: FilterProps) => {
    set((state) =>
        produce(state, (draft: VznListState) => {
            draft.loading = true;
            draft.error = null;
        })
    );

    try {
      const response = await axios.post('http://92.55.15.91:8225/stock/wsInplants.loadByFilter',
          {
            authToken: token,
            flt: filters
          },
      );

      const data: VznItemProps[] = response.data.wsInplants || [];

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
