import * as React from 'react';
import { useEffect } from 'react';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore'; 
import { useModalStore } from '@/stores/useModalStore';
import VznDetailModal from '../../../../components/VznDetailsModal/VznDetailsModal';
import { useAuthStore } from '@/stores/useAuthStore';
import { useParams } from 'react-router-dom';

const VznDetails: React.FC = () => {
  const { wsInplantCode } = useParams<{ wsInplantCode: string }>();
  const { vznDetails, fetchVznDetails } = useVznDetailsStore();
  const { openVznModal, selectedVznId } = useModalStore();
  const authToken = useAuthStore((state) => state.authToken); 

  useEffect(() => {
    if (authToken && wsInplantCode) {
      fetchVznDetails(authToken, Number(wsInplantCode));
    }
  }, [authToken, wsInplantCode, fetchVznDetails]);

  const handleClick = (vznId: number) => {
    openVznModal(vznId);
  };

  return (
    <div>
      <h2>ВЗН №</h2>
      <ul className="vzn-details-list">
        {vznDetails?.wsInplantContents.map((item) => (
          <li key={item.Code} className="vzn_item" onClick={() => handleClick(item.Code)}>
            <p>{item.ArticleCode || 'Неизвестно'} - {item.ArticleName || 'Неизвестно'}</p>
            <p>Выдано: {item.LeaveQty}</p>
            <p>Получено: {item.ArrivalQty}</p>
          </li>
        ))}
      </ul>
      
      { selectedVznId && <VznDetailModal /> }
    </div>
  );
};

export default VznDetails;