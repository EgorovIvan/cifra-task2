import * as React from 'react';
import { useModalStore } from '@/stores/useModalStore';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore';
import Modal from '@/components/UI/Modal/Modal';
import Pagination from '@/components/UI/Pagination/Pagination';

const VznDetailModal: React.FC = () => {
  const { closeModal } = useModalStore();
  const { vznDetails } = useVznDetailsStore();

  const [currentPage, setCurrentPage] = React.useState(1);

  const totalItems = vznDetails?.wsInplantContents.length || 0;

  const selectedItem = vznDetails?.wsInplantContents[currentPage - 1];

  if (!selectedItem) return null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Modal isOpen={!!selectedItem} onClose={closeModal}>
      <div className="vzn_detail__modal">
        <h2>Детали элемента ВЗН</h2>
        <p><strong>Номер карточки:</strong> {selectedItem.Code}</p>
        <p><strong>Обозначение:</strong> {selectedItem.ArticleCode}</p>
        <p><strong>Наименование:</strong> {selectedItem.ArticleName || 'Неизвестно'}</p>

        <div>
          <label>Выдано:</label>
          <input type="number" defaultValue={selectedItem.LeaveQty} />
        </div>
        <div>
          <label>Получено:</label>
          <input type="number" defaultValue={selectedItem.ArrivalQty} />
        </div>

        <Pagination totalItems={totalItems} onPageChange={handlePageChange} currentPage={currentPage} />
      </div>
    </Modal>
  );
};

export default VznDetailModal;