import * as React from "react";
import {useState} from 'react'
import ModalVznList from "../components/UI/Modals/ModalVznList.tsx";
import ModalFilter from "../components/UI/Modals/ModalFilter.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import Modal from "@/components/UI/Modal/Modal.tsx";
import { useModalStore } from "@/stores/modalStore.ts";

const Accounting: React.FC = () => {

  const { isModalOpen, openModal, closeModal } = useModalStore();
  const [modalFilterVisible, setModalFilterVisible] = useState<boolean>(false);

  // Открытие модального окна ВЗН (Расход)
  const handleOpenModalVznList = (): void => {
    openModal();
  };

  // Открытие модального окна Фильтр ВЗН УП
  const handleOpenModalFilter = (): void => {
    setModalFilterVisible(true)
  }

  // Закрытие модального окна Фильтр ВЗН УП
  const handleCloseModalFilter = (): void => {
    setModalFilterVisible(false)
  }

  // Закрытие всех модальных окон
  const handleCloseModals = (): void => {
    setModalFilterVisible(false)
  }

  return (
    <>
      <MainLayout
          headline="Меню"
          showCloseButton={false}
          hasBorder={true}
          isBlueBackground={true}
      >
        <ul className="main__list">
          <li className="main__list-item accounting-item">
            <a href="#">
              <span>Акты инвентаризации</span>
            </a>
          </li>
          <li className="main__list-item accounting-item">
            <a href="#">
              <span>Внутризаводские накладные (Приход)</span>
            </a>
          </li>
          <li className="main__list-item accounting-item">
            <a href="#" id="consumption-btn" onClick={handleOpenModalFilter}>
              <span>Внутризаводские накладные (Расход)</span>
            </a>
          </li>
          <li className="main__list-item accounting-item">
            <a href="#">
              <span>Лимитные карты (Приход)</span>
            </a>
          </li>
          <li className="main__list-item accounting-item">
            <a href="#">
              <span>Цеховая номенклатура</span>
            </a>
          </li>
        </ul>

      </MainLayout>
      {/*modal consumption */}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalVznList />
      </Modal>
      {/*modal filter*/}

      {modalFilterVisible ? <ModalFilter
          handleOpenModalVznList={handleOpenModalVznList}
        handleCloseModalFilter={handleCloseModalFilter}
        handleCloseModals={handleCloseModals}
      /> : ''}

    </>
  )
}

export default Accounting
