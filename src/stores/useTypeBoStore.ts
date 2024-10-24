import {create} from "zustand";
import {produce} from "immer";
import axios from "axios";

export interface InfoBo {
    soCode?: number;
    soType: number;
}

interface TypeBoState {
    typeBo: InfoBo;
    loading: Boolean;
    error: string | null;
    fetchTypeBo: (token: string | null, boCode: string) => Promise<void>;
}

export const useTypeBoStore = create<TypeBoState>((set) => ({
    typeBo: {},

    fetchTypeBo: async (token: string | null, soNum: string) => {

        try {
            const response = await axios.post('http://92.55.15.91:8225/so.findOmpObject',
                {
                    authToken: token,
                    soNum: soNum
                },
            );

            const data: InfoBo = response.data || {};
            console.log(response.data)
            set(
                produce((state: TypeBoState) => {
                    state.typeBo = data;
                })
            );
        } catch {
            set(
                produce((state: TypeBoState) => {
                    state.error = 'Ошибка загрузки данных ВЗН УП';
                })
            );
        } finally {
            set(
                produce((state: TypeBoState) => {
                    state.loading = false;
                })
            );
        }
    },
}))
