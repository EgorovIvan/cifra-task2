import * as React from "react";
import {useState} from 'react'
import ModalVznList from "../components/UI/Modals/ModalVznList.tsx";
import ModalFilter from "../components/UI/Modals/ModalFilter.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

const Accounting: React.FC = () => {

  const [modalVznListVisible, setModalVznListVisible] = useState<boolean>(false);
  const [modalFilterVisible, setModalFilterVisible] = useState<boolean>(false);

  // Открытие модального окна ВЗН (Расход)
  const handleOpenModalVznList = (): void => {
    console.log("test")
    setModalVznListVisible(true)
    setModalFilterVisible(false)
  }

  // Закрытие модального окна ВЗН (Расход)
  // const handleOCloseModalVznList = (): void => {
  //   setModalVznListVisible(false)
  // }

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
    setModalVznListVisible(false)
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

      {modalVznListVisible ? <ModalVznList handleOpenModalFilter={handleOpenModalFilter}/> : ''}

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
