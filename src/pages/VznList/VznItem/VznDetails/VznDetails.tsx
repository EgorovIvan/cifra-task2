import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../../vzn_list.scss';
import '../vzn_item.scss';
import './vzn_details.scss';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore'; 
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import VznDetailModal from '../../../../components/VznDetailsModal/VznDetailsModal';
import Header from '@/components/Header/Header';
import { useVznListStore } from '@/stores/useVznListStore';
import { formatDate } from '@/utils/formatDate';
import { findDivisionName } from '@/utils/findDivisionName';
import { DivisionsProps } from '@/interfaces/DivisionsProps';

const VznDetails: React.FC<{ divisions: DivisionsProps[] }> = ({ divisions }) => {
  const { wsInplantCode } = useParams<{ wsInplantCode: string }>();
  const { vznList } = useVznListStore();
  const { vznDetails, fetchVznDetails } = useVznDetailsStore();
  const { openVznModal, selectedVznId } = useModalStore();
  const authToken = useAuthStore((state) => state.authToken); 

  useEffect(() => {
    if (authToken && wsInplantCode) {
      fetchVznDetails(authToken, Number(wsInplantCode));
    }
  }, [authToken, wsInplantCode, fetchVznDetails]);

  const selectedVzn = vznList.find((vzn) => vzn.Code === Number(wsInplantCode));

  const handleClick = (vznId: number) => {
    openVznModal(vznId);
  };

  console.log("Список отделов" ,divisions);

  return (
    <>
      <Header headline={'ВЗН №'} hasBorder={false}/>
      <main className='main'>
        {selectedVzn && (
          <div className="vzn_details__summary">
            <p><strong>Отправитель:</strong> {findDivisionName(selectedVzn.Sender, divisions)}</p>
            <p><strong>Получатель:</strong> {findDivisionName(selectedVzn.Receiver, divisions)}</p>
            <p><strong>Статус:</strong> {selectedVzn.bo?.State || 'Неизвестно'}</p>
            <p><strong>Дата выдачи:</strong> {formatDate(selectedVzn.DocDate)}</p>
          </div>
        )}
        <ul className="vzn_list">
          {vznDetails?.wsInplantContents.map((item) => (
            <li key={item.Code} className="vzn_item" onClick={() => handleClick(item.Code)}>
              <p>{item.ArticleCode || 'Неизвестно'} - {item.ArticleName || 'Неизвестно'}</p>
              <p>Выдано: {item.LeaveQty}</p>
              <p>Получено: {item.ArrivalQty}</p>
            </li>
          ))}
        </ul>
      </main>
      
      { selectedVznId && <VznDetailModal /> }
    </>
  );
};

export default VznDetails;