import * as React from "react";
import './vzn_list.scss';
import { VznItemProps } from "../../../types/types";

const VznItem: React.FC<{ item: VznItemProps }> = ({ item }) => {
  return (
    <li className="vzn_item">
      <h2>{item.vzn_number}</h2>
      <p><span>Отправитель:</span> {item.sender}</p>
      <p><span>Получатель:</span> {item.recipient}</p>
      <p><span>Дата выдачи:</span> {item.date_issue}</p>
    </li>
  );
};

export default VznItem;