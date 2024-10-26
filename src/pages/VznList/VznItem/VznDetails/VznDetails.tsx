import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as React from "react";
import '../../vzn_list.scss';
import '../vzn_item.scss';
import './vzn_details.scss';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore';
import { useModalStore } from '@/stores/useModalStore';
import {AuthState, useAuthStore} from '@/stores/useAuthStore';
import VznDetailModal from '../../../../components/VznDetailsModal/VznDetailsModal';
import Header from '@/components/Header/Header';
import { useVznListStore } from '@/stores/useVznListStore';
import { formatDate } from '@/utils/formatDate';
import { findDivisionName } from '@/utils/findDivisionName';
import { useDivisionsStore } from '@/stores/useDivisionsStore';
import { useStockStore } from '@/stores/useStockStore';


const VznDetails: React.FC = () => {
  const authToken = useAuthStore((state: AuthState) => state?.authToken);
  const { wsInplantCode } = useParams<{ wsInplantCode: string }>();
  const { vznList } = useVznListStore();
  const { vznDetails, fetchVznDetails } = useVznDetailsStore();
  const { openVznModal, selectedVznId } = useModalStore();
  const { divisions, fetchDivisions } = useDivisionsStore();
  const { stockObject, fetchStockObject } = useStockStore();

  useEffect(() => {
    if (authToken && wsInplantCode) {
      fetchDivisions(authToken);
      fetchVznDetails(authToken, Number(wsInplantCode));
      fetchStockObject(authToken, vznDetails?.wsInplantContents.find(item => item)?.Code);
    }
  }, [authToken, wsInplantCode, fetchDivisions, fetchVznDetails]);

  const selectedVzn = vznList.find((vzn) => vzn.Code === Number(wsInplantCode));

  const handleClick = (vznId: number) => {
    openVznModal(vznId);
  };


  return (
    <>
      <Header headline={`ВЗН №${selectedVzn?.Num}`} hasBorder={false}/>
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
              <p>{stockObject?.NomNum || '556-47825-01'} - {stockObject?.Description || 'Гайка М12х2,5 ГОСТ 48975-87'}</p>
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
