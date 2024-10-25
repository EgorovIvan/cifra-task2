import * as React from "react";
import Modal from "../components/UI/Modal/Modal.tsx";
import { useModalStore } from "../stores/useModalStore.ts";
import Filter from "@/components/Filter/Filter.tsx";
import Header from "@/components/Header/Header.tsx";

const Accounting: React.FC = () => {

  const { isModalFilterOpen, openFilterModal, closeFilterModal } = useModalStore();

  // Открытие модального окна ВЗН (Расход)
  const handleOpenFilterModal = (): void => {
      openFilterModal();
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
        <Header
            headline="Учёт в производстве"
            showCloseButton={false}
            hasBorder={true}
            isBlueBackground={true}
        />
        <main className={'main'}>
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
        </main>
        {/*modal consumption */}

        {/*<Modal isOpen={isModalOpen} onClose={closeModal}>*/}
        {/*  <VznList />*/}
        {/*</Modal>*/}

        {/*modal filter*/}

        <Modal isOpen={isModalFilterOpen} onClose={closeFilterModal}>
          <Filter />
        </Modal>

        {/* Модальное окно с результатами ВЗН УП */}
        {/*<Modal isOpen={isResultsModalOpen} onClose={closeResultsModal}>*/}
        {/*  <VznList />*/}
        {/*</Modal>*/}

        {/* {modalFilterVisible ? <Filter*/}
        {/*    handleOpenModalVznList={handleOpenModalVznList}*/}
        {/*  handleCloseModalFilter={handleCloseModalFilter}*/}
        {/*  handleCloseModals={handleCloseModals}*/}
        {/*/> : ''}*/}

      </>
  )
}

export default Accounting
