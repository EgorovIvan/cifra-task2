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
    updateTypeBo: (newTypeBo: { soCode: null; soType: number }) => void;
    fetchTypeBo: (token: string | null, boCode?: string) => Promise<void>;
}

export const useTypeBoStore = create<TypeBoState>((set) => ({
    typeBo: {
        soCode: null,
        soType: 0
    },
    loading: false,
    error: null,
    updateTypeBo: (newTypeBo): void => {
        set((state) =>
            produce(state, (draft: TypeBoState) => {
                draft.typeBo = {...draft.typeBo, ...newTypeBo};
            })
        )
    },
    fetchTypeBo: async (token: string | null, soNum?: string ) => {

        try {
            const response = await axios.post('http://92.55.15.91:8225/so.findOmpObject',
                {
                    authToken: token,
                    soNum: soNum
                },
            );

            const data: InfoBo = response.data || {};
            console.log(response)
            set((state) =>
                produce(state, (draft: TypeBoState) => {
                    draft.typeBo = data;
                })
            );
        } catch {
            set((state) =>
                produce(state, (draft: TypeBoState) => {
                    draft.error = 'Ошибка загрузки данных ВЗН УП';
                })
            );
        } finally {
            set((state) =>
                produce(state, (draft: TypeBoState) => {
                    draft.loading = false;
                })
            );
        }
    },
}))
