import { useState, useEffect } from 'react';

import './vznDeatailsModal.scss'
import '@/pages/VznList/VznItem/VznDetails/vzn_details.scss';
import { useModalStore } from '@/stores/useModalStore';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore';
import Modal from '@/components/UI/Modal/Modal';
import Pagination from '@/components/UI/Pagination/Pagination';
import Header from '../Header/Header';
import Input from '../UI/Inputs/Input';

const VznDetailModal: React.FC = () => {
  const { closeModal } = useModalStore();
  const { vznDetails } = useVznDetailsStore();
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = vznDetails?.wsInplantContents.length || 0;
  const selectedItem = vznDetails?.wsInplantContents[currentPage - 1];

  // Хранение значений инпутов для "Выдано" и "Получено"
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

  return (
    <Modal isOpen={!!selectedItem} onClose={closeModal}>

      <Header headline='Элемент ВЗН №' />
      <main className='vzn_details__modal'>
        <div className="vzn_details__summary">
          <p><strong>№ карточки:</strong> {selectedItem.Code}</p>
          <p><strong>Обозначение:</strong> {selectedItem.ArticleCode}</p>
          <p><strong>Наименование:</strong> {selectedItem.ArticleName || 'Неизвестно'}</p>

          <div>
            <Input
              type="text"
              name="sender"
              title="Выдано (шт)*"
              inputValue={leaveQty} 
            />
          </div>
          <div>
            <Input
              type="text"
              name="sender"
              title="Получено (шт)*"
              inputValue={arrivalQty} 
            />
          </div>

          <Pagination totalItems={totalItems} onPageChange={handlePageChange} currentPage={currentPage} />
        </div>
      </main>
    </Modal>
  );
};

export default VznDetailModal;