import axios from 'axios';
import { create } from 'zustand';
import { produce } from 'immer';

interface StockObject {
  Code: string;
  Sign: string;
  NomNum: string;
  Description: string;
}

interface StockState {
  stockObject: StockObject | null;
  loading: boolean;
  error: string | null;
  fetchStockObject: (authToken: string, stockObjectCode?: number) => Promise<void>;
}

export const useStockStore = create<StockState>((set) => ({
  stockObject: null,
  loading: false,
  error: null,

  fetchStockObject: async (authToken: string, stockObjectCode?: number) => {
    set(
      produce((state: StockState) => {
        state.loading = true;
        state.error = null;
      })
    );

    try {
      const response = await axios.post('http://92.55.15.91:8225/stockobjs.loadByFilter', {
        authToken: authToken,
        flt: { Codes: [ stockObjectCode ] }
      });
      
      const data = response.data.stockobjs.map((item: StockObject) => ({
        Code: item.Code,
        Sign: item.Sign,
        NomNum: item.NomNum,
        Description: item.Description
      }));
      
      
      set(
        produce((state: StockState) => {
          state.stockObject = data[0];
        })
      );
    } catch {
      set(
        produce((state: StockState) => {
          state.error = 'Ошибка загрузки данных ТМЦ';
        })
      );
    } finally {
      set(
        produce((state: StockState) => {
          state.loading = false;
        })
      );
    }
  },
}));