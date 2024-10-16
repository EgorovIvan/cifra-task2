import * as React from "react";
import './vzn_list.scss'

interface Props {
  item: {
    vzn_number: string;
    sender: string;
    recipient: string;
    date_issue: string;
  }
}

const VznItem: React.FC<Props> = ({item}: Props) => {

  return (
    <>
      <li className="vzn_item">
        <h2>{item.vzn_number}</h2>
        <p><span>Отправитель:</span>{item.sender}</p>
        <p><span>Получатель:</span>{item.recipient}</p>
        <p><span>Дата выдачи:</span>{item.date_issue}</p>
      </li>
    </>
  )
}

export default VznItem
