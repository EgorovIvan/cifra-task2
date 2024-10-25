export interface FilterProps {
    Codes?: number[]; // Коды
    Num?: string; // Маска номера
    Sender?: number;
    Receiver?: number;
    fromDate?: string;
    toDate?: string;
    GatheringContCode?: number; // Код состава КВ
}
