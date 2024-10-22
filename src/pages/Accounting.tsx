import * as React from "react";
import MainLayout from "../layouts/MainLayout.tsx";
import Modal from "../components/UI/Modal/Modal.tsx";
import { useModalStore } from "../stores/useModalStore.ts";
import Filter from "@/components/Filter/Filter.tsx";
import VznList from "@/components/VznList/VznList.tsx";

const Accounting: React.FC = () => {

  const { isModalOpen, isResultsModalOpen, openModal, closeModal, closeResultsModal } = useModalStore();

  // Открытие модального окна ВЗН (Расход)
  const handleOpenFilterModal = (): void => {
    openModal();
  };

  // Открытие модального окна Фильтр ВЗН УП
  // const handleOpenModalFilter = (): void => {
  //   setModalFilterVisible(true)
  // }

  // Закрытие модального окна Фильтр ВЗН УП
  // const handleCloseModalFilter = (): void => {
  //   setModalFilterVisible(false)
  // }

  // Закрытие всех модальных окон
  // const handleCloseModals = (): void => {
  //   setModalFilterVisible(false)
  // }

  return (
      <>
        <MainLayout
            headline="Меню"
            showCloseButton={false}
            hasBorder={true}
            isBlueBackground={true}
        >
          <ul className="main__list">
            <li className="main__list_item accounting_item">
              <a href="#">
                <span>Акты инвентаризации</span>
              </a>
            </li>
            <li className="main__list_item accounting_item">
              <a href="#">
                <span>Внутризаводские накладные (Приход)</span>
              </a>
            </li>
            <li className="main__list_item accounting_item">
              <a href="#" id="consumption-btn" onClick={handleOpenFilterModal}>
                <span>Внутризаводские накладные (Расход)</span>
              </a>
            </li>
            <li className="main__list_item accounting_item">
              <a href="#">
                <span>Лимитные карты (Приход)</span>
              </a>
            </li>
            <li className="main__list_item accounting_item">
              <a href="#">
                <span>Цеховая номенклатура</span>
              </a>
            </li>
          </ul>

        </MainLayout>

        {/*modal consumption */}

        {/*<Modal isOpen={isModalOpen} onClose={closeModal}>*/}
        {/*  <VznList />*/}
        {/*</Modal>*/}

        {/*modal filter*/}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Filter />
        </Modal>

        {/* Модальное окно с результатами ВЗН УП */}
        <Modal isOpen={isResultsModalOpen} onClose={closeResultsModal}>
          <VznList />
        </Modal>

        {/* {modalFilterVisible ? <Filter*/}
        {/*    handleOpenModalVznList={handleOpenModalVznList}*/}
        {/*  handleCloseModalFilter={handleCloseModalFilter}*/}
        {/*  handleCloseModals={handleCloseModals}*/}
        {/*/> : ''}*/}

      </>
  )
}

export default Accounting
