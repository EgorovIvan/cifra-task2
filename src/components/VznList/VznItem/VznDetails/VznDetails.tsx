import * as React from 'react';
import { useEffect } from 'react';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore'; 
import { useModalStore } from '@/stores/useModalStore';
import VznDetailModal from './VznDetailsModal/VznDetailsModal';
import { useAuthStore } from '@/stores/useAuthStore';

const VznDetails: React.FC = () => {
  const { vznDetails, fetchVznDetails } = useVznDetailsStore();
  const { isModalOpen, openModal, selectedVznId } = useModalStore();
  const authToken = useAuthStore((state) => state.authToken); 

  useEffect(() => {
    if (authToken && selectedVznId) {
      fetchVznDetails(authToken, selectedVznId);
    }
  }, [authToken, selectedVznId, fetchVznDetails]);

  const handleClick = () => {
    openModal(); 
  };

  return (
    <div>
      <h2>Детали ВЗН</h2>
      <ul className="vzn-details-list">
        {vznDetails?.wsInplantContents.map((item) => (
          <li key={item.Code} onClick={() => handleClick()}>
            <p>Код карточки: {item.Code}</p>
            <p>Обозначение: {item.ArticleCode}</p>
            <p>Наименование: {item.ArticleName || 'Неизвестно'}</p>
            <p>Выдано: {item.LeaveQty}</p>
            <p>Получено: {item.ArrivalQty}</p>
          </li>
        ))}
      </ul>
      
      {isModalOpen && selectedVznId && <VznDetailModal />}
    </div>
  );
};

export default VznDetails;