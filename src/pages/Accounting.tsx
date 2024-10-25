import * as React from "react";
import Modal from "../components/UI/Modal/Modal.tsx";
import { useModalStore } from "../stores/useModalStore.ts";
import Filter from "@/components/Filter/Filter.tsx";
import Header from "@/components/Header/Header.tsx";

const Accounting: React.FC = () => {

  const { isFilterModalOpen, openFilterModal, closeFilterModal } = useModalStore();

  // Открытие модального окна ВЗН (Расход)
  const handleOpenFilterModal = (): void => {
      openFilterModal();
  };

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

        {/*modal filter*/}
        <Modal isOpen={isFilterModalOpen} onClose={closeFilterModal}>
          <Filter />
        </Modal>
      </>
  )
}

export default Accounting
