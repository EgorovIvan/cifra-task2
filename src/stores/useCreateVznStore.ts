import {create} from "zustand";
import axios from "axios";
import {produce} from "immer";
import {formatDateISO8601} from "@/utils/formatDate.ts";

interface VznItemData {
    Num: string;
    DocDate: string;
    Sender: number;
    SenderSection: number
    Receiver: number;
    ReceiverSection: number;
    LeaveMoveDate: string;
    ArrivalMoveDate: string;
    bo: {
        so: {
            attrs: {
                Code: number;
                IsNull: boolean;
                MeasCode: number;
                Value?: string;
            }[]
        }
    }
}

interface NewVznDataState {
    newVznData: VznItemData;
    error: string | null;
    updateNewVznData: (newData: Partial<VznItemData>) => void;
    createVznItem: (token: string | null) => Promise<void>;
}

export const useCreateVznStore = create<NewVznDataState>((set, get) => ({
    newVznData: {
        Num: '',
        DocDate: formatDateISO8601(Date()),
        Sender: 0,
        SenderSection: 0,
        Receiver: 0,
        ReceiverSection: 0,
        LeaveMoveDate: '',
        ArrivalMoveDate: '',
        bo: {
            so: {
                attrs: [{
                    Code: 0,
                    IsNull: false,
                    MeasCode: 0,
                    Value: ''
                }]
            }
        },
    },
    error: null,

    updateNewVznData: (newData): void => {
        set((state) =>
            produce(state, (draft: NewVznDataState) => {
                draft.newVznData = {...draft.newVznData, ...newData};
            })
        )
    },

    createVznItem: async (token: string | null) => {

        set((state) =>
            produce(state, (draft: NewVznDataState) => {
                draft.error = null;
            })
        );

        const data = get().newVznData

        try {
            const response = await axios.post('http://92.55.15.91:8225/stock/wsInplants.insert',
                {
                    authToken: token,
                    data: data
                },
            );

            console.log(response)
            console.log(data)
        } catch {
            set((state) =>
                produce(state, (draft: NewVznDataState) => {
                    draft.error = 'Ошибка создания новой ВЗН УП';
                })
            );
        }
    }
}));
