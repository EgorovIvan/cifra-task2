import * as React from "react";

interface Props {
  item: {
    number: number;
    sender: string;
    recipient: string;
    date_issue: string;
  }
}

const VznItem: React.FC<Props> = ({item}: Props) => {

  return (
    <>
      <li className="list-vzn__block-item">
        <h2>{item.number}</h2>
        <p><span>Отправитель:</span>{item.sender}</p>
        <p><span>Получатель:</span>{item.recipient}</p>
        <p><span>Дата выдачи:</span>{item.date_issue}</p>
      </li>
    </>
  )
}

export default VznItem
