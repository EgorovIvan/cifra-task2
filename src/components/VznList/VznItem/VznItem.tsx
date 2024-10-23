import * as React from "react";
import './vzn_list.scss';
import { VznItemProps } from "../../../interfaces/VizItemProps";
import { formatDate } from "@/utils/formatDate";
import { DivisionsProps } from "@/interfaces/DivisionsProps";
import { Link } from "react-router-dom";

const VznItem: React.FC<{ item: VznItemProps, divisions: DivisionsProps[] }> = ({ item, divisions }) => {

  const findDivisionName = (code: number): string => {
    const division = divisions.find((div) => div.Code === code);
    return division ? division.Name : "Неизвестно";
  };

  return (
    <li className="vzn_item">
      <Link to={`/vzn/${item.Code}`}>
        <h2>ВЗН №{item.Num}</h2>
        <p><span>Отправитель:</span> {findDivisionName(Number(item.Sender))}</p>
        <p><span>Получатель:</span> {findDivisionName(Number(item.Receiver))}</p>
        <p><span>Дата выдачи:</span> {formatDate(item.DocDate)}</p>
      </Link>
    </li>
  );
};

export default VznItem;