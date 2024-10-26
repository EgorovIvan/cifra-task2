import { useState, useEffect } from 'react';

import './vznDeatailsModal.scss'
import '@/pages/VznList/VznItem/VznDetails/vzn_details.scss';
import { useModalStore } from '@/stores/useModalStore';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore';
import Modal from '@/components/UI/Modal/Modal';
import Pagination from '@/components/UI/Pagination/Pagination';
import Header from '../Header/Header';
import Input from '../UI/Inputs/Input';

interface VznDetailModalProps {
  vznNum?: string; // Передаем номер ВЗН как необязательный пропс
}


const VznDetailModal: React.FC<VznDetailModalProps> = ({ vznNum }) => {
  const { closeModal } = useModalStore();
  const { vznDetails } = useVznDetailsStore();
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = vznDetails?.wsInplantContents.length || 0;
  const selectedItem = vznDetails?.wsInplantContents[currentPage - 1];

  const [leaveQty, setLeaveQty] = useState(selectedItem?.LeaveQty || 0);
  const [arrivalQty, setArrivalQty] = useState(selectedItem?.ArrivalQty || 0);

  useEffect(() => {
    if (selectedItem) {
      setLeaveQty(selectedItem.LeaveQty);
      setArrivalQty(selectedItem.ArrivalQty);
    }
  }, [selectedItem]);

  if (!selectedItem) return null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(selectedItem);
  

  return (
    <Modal isOpen={!!selectedItem} onClose={closeModal}>

      <Header headline={`Элемент ВЗН №${vznNum}`} showCloseButton={true} onCloseButtonClick={closeModal}/>
      <main className='vzn_details__modal'>
        <div className="vzn_details__modal__summary">
          <p><span>№ карточки: </span>{selectedItem.Code}</p>
          <p><span>Обозначение: </span>{selectedItem.ArticleCode}</p>
          <p><span>Наименование: </span>{selectedItem.ArticleName || 'Неизвестно'}</p>
        </div>

        <div className="vzn_details__modal__qty">
          <div className="vzn_details__modal__qty__item">
            <Input
              type="text"
              name="sender"
              title="Выдано (шт)*"
              inputValue={leaveQty} 
            />
          </div>
          <div className="vzn_details__modal__qty__item">
            <Input
              type="text"
              name="sender"
              title="Получено (шт)*"
              inputValue={arrivalQty} 
            />
          </div>
        </div>
        <Input
            type="text"
            name="sender"
            title="№ заказа"
            inputValue='' 
          />
        <Pagination totalItems={totalItems} onPageChange={handlePageChange} currentPage={currentPage} />
      </main>
    </Modal>
  );
};

export default VznDetailModal;