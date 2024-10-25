import { Link } from "react-router-dom";

import './vzn_item.scss';
import { VznItemProps } from "../../../interfaces/VizItemProps";
import { formatDate } from "@/utils/formatDate";
import { DivisionsProps } from "@/interfaces/DivisionsProps";
import { findDivisionName } from "@/utils/findDivisionName";

const VznItem: React.FC<{ item: VznItemProps, divisions: DivisionsProps[] }> = ({ item, divisions }) => {

  const senderName = findDivisionName(item.Sender, divisions);
  const receiverName = findDivisionName(item.Receiver, divisions);

  return (
    <li className="vzn_item">
        <Link
        to={`/vzn-list/${item.Code}`}
        state={{
          sender: senderName,
          receiver: receiverName,
          docDate: item.DocDate,
          status: item.bo?.State || "Неизвестно"
        }}
      >
        <h2>ВЗН №{item.Num}</h2>
        <p><span>Отправитель:</span> {findDivisionName(item.Sender, divisions)}</p>
        <p><span>Получатель:</span> {findDivisionName(item.Receiver, divisions)}</p>
        <p><span>Дата выдачи:</span> {formatDate(item.DocDate)}</p>
      </Link>
    </li>
  );
};

export default VznItem;
