import axios from 'axios';
import { create } from 'zustand';
import { produce } from 'immer';
import { DivisionsProps } from '@/interfaces/DivisionsProps';

interface DivisionsState {
  divisions: DivisionsProps[];
  loading: boolean;
  error: string | null;
  fetchDivisions: (token: string | null) => Promise<void>;
}

export const useDivisionsStore = create<DivisionsState>((set) => ({
  divisions: [],
  loading: false,
  error: null,

  fetchDivisions: async (token: string | null) => {
    set(
      produce((state: DivisionsState) => {
        state.loading = true;
        state.error = null;
      })
    );

    try {
      const response = await axios.post('http://92.55.15.91:8225/divisions/storeDivisions.loadByFilter', {
        authToken: token,
        flt: {}
      });

      const data: DivisionsProps[] = response.data.divisions || [];

      set(
        produce((state: DivisionsState) => {
          state.divisions = data;
        })
      );
    } catch {
      set(
        produce((state: DivisionsState) => {
          state.error = 'Ошибка загрузки данных подразделений';
        })
      );
    } finally {
      set(
        produce((state: DivisionsState) => {
          state.loading = false;
        })
      );
    }
  },
}));