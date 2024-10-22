import axios from 'axios';
import { create } from 'zustand';
import { produce } from 'immer';

import { VznItemProps } from '../types/types';
import {Filter} from '@/interfaces/Filter.ts'

interface VznState {
  vznList: VznItemProps[];
  loading: boolean;
  error: string | null;
  fetchVznList: (token: string | null, filters: Filter) => Promise<void>;
}

export const useVznStore = create<VznState>((set) => ({
  vznList: [],
  loading: false,
  error: null,

  fetchVznList: async (token: string, filters: Filter) => {
    set(
        produce((state: VznState) => {
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

      console.log(response)
      const data: VznItemProps[] = response.data.wsInplants || [];

      set(
          produce((state: VznState) => {
            state.vznList = data;
          })
      );
    } catch {
      set(
          produce((state: VznState) => {
            state.error = 'Ошибка загрузки данных ВЗН УП';
          })
      );
    } finally {
      set(
          produce((state: VznState) => {
            state.loading = false;
          })
      );
    }
  },
}));
