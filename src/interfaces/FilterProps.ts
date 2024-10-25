export interface FilterProps {
    Codes?: number[]; // Коды
    Num?: string; // Маска номера
    Sender?: number;
    Receiver?: number;
    Period?: string;
    GatheringContCode?: number; // Код состава КВ
}
