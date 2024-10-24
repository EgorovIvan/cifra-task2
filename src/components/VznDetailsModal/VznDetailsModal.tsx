import * as React from 'react';
import { useModalStore } from '@/stores/useModalStore';
import { useVznDetailsStore } from '@/stores/useVznDetailsStore';
import Modal from '@/components/UI/Modal/Modal';
import Pagination from '@/components/UI/Pagination/Pagination';

const VznDetailModal: React.FC = () => {
  const { closeModal, selectedVznId } = useModalStore();
  const { vznDetails } = useVznDetailsStore();
  
  const selectedItem = vznDetails?.wsInplantContents.find(item => item.Code === selectedVznId);
  
  if (!selectedItem) return null;

  return (
    <Modal isOpen={!!selectedItem} onClose={closeModal}>
      <div className="vzn-detail-modal">
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
        <div>
          <label>Номер заказа:</label>
          {/* <input type="text" defaultValue={selectedItem.OrderCode} /> */}
        </div>

        <Pagination totalItems={vznDetails?.wsInplantContents.length || 1} />
      </div>
    </Modal>
  );
};

export default VznDetailModal;