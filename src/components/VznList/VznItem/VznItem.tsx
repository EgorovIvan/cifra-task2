import * as React from "react";
import './vzn_list.scss';
import { VznItemProps } from "../../../interfaces/VizItemProps";
import { formatDate } from "@/utils/formatDate";
import { DivisionsProps } from "@/interfaces/DivisionsProps";

const VznItem: React.FC<{ item: VznItemProps, divisions: DivisionsProps[] }> = ({ item, divisions }) => {

  const findDivisionName = (code: number): string => {
    const division = divisions.find((div) => div.Code === code);
    return division ? division.Name : "Неизвестно";
  };

  return (
    <li className="vzn_item">
      <h2>ВЗН №{item.Num}</h2>
      <p><span>Отправитель:</span> {findDivisionName(Number(item.Sender))}</p>
      <p><span>Получатель:</span> {findDivisionName(Number(item.Receiver))}</p>
      <p><span>Дата выдачи:</span> {formatDate(item.DocDate)}</p>
    </li>
  );
};

export default VznItem;