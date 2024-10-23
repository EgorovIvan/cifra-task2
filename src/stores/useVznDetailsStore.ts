import axios from 'axios';
import { create } from 'zustand';
import { produce } from 'immer';

interface VznDetails {
  Sender: string;
  Receiver: string;
  State: string;
  LeaveMoveDate: string;
  wsInplantContents: WsInplantContent[];
}

interface WsInplantContent {
  Code: number;
  ArticleCode: string;   // Обозначение
  ArticleName: string;   // Наименование
  LeaveQty: number;
  ArrivalQty: number;
}

interface VznDetailsState {
  vznDetails: VznDetails | null;
  loading: boolean;
  error: string | null;
  fetchVznDetails: (authToken: string, wsInplantCode: number) => Promise<void>;
}

export const useVznDetailsStore = create<VznDetailsState>((set) => ({
  vznDetails: null,
  loading: false,
  error: null,

  fetchVznDetails: async (authToken: string, wsInplantCode: number) => {
    set(
      produce((state: VznDetailsState) => {
        state.loading = true;
        state.error = null;
      })
    );

    try {
      const response = await axios.post('http://92.55.15.91:8225/stock/wsInplants/contents.loadByFilter', {
        authToken: authToken,
        flt: { WsInplantCode: wsInplantCode },
      });

      const data = response.data.wsInplantContents.map((item: WsInplantContent) => ({
        Code: item.Code,
        ArticleCode: item.ArticleCode,    // Обозначение
        ArticleName: item.ArticleName,    // Наименование
        LeaveQty: item.LeaveQty,
        ArrivalQty: item.ArrivalQty,
      }));

      set(
        produce((state: VznDetailsState) => {
          state.vznDetails = {
            Sender: response.data.Sender,
            Receiver: response.data.Receiver,
            State: response.data.State,
            LeaveMoveDate: response.data.LeaveMoveDate,
            wsInplantContents: data,
          };
        })
      );
    } catch {
      set(
        produce((state: VznDetailsState) => {
          state.error = 'Ошибка загрузки данных ВЗН';
        })
      );
    } finally {
      set(
        produce((state: VznDetailsState) => {
          state.loading = false;
        })
      );
    }
  },
}));