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
    set(
        produce((state: VznListState) => {
          state.loading = true;
          state.error = null;
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

      set(
          produce((state: VznListState) => {
            state.vznList = data;
          })
      );
    } catch {
      set(
          produce((state: VznListState) => {
            state.error = 'Ошибка загрузки данных ВЗН УП';
          })
      );
    } finally {
      set(
          produce((state: VznListState) => {
            state.loading = false;
          })
      );
    }
  },
}));
