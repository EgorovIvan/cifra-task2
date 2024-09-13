import {useState} from 'react'
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import ModalVznList from "../components/ModalVznList.tsx";
import ModalFilter from "../components/ModalFilter.tsx";

const Accounting: React.FC = () => {

  const [modalVznListVisible, setModalVznListVisible] = useState<boolean>(false);
  const [modalFilterVisible, setModalFilterVisible] = useState<boolean>(false);

  // Открытие модального окна ВЗН (Расход)
  const handleOpenModalVznList = (): void => {
    setModalVznListVisible(true)
  }

  // Закрытие модального окна ВЗН (Расход)
  const handleOCloseModalVznList = (): void => {
    setModalVznListVisible(false)
  }

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
      <Header/>
      <main className="main">
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
            <a href="#" id="consumption-btn" onClick={handleOpenModalVznList}>
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
      </main>
      <Footer/>

      {/*modal consumption */}

      {modalVznListVisible ? <ModalVznList handleOpenModalFilter={handleOpenModalFilter}/> : ''}

      {/*modal filter*/}

      {modalFilterVisible ? <ModalFilter
        handleCloseModalFilter={handleCloseModalFilter}
        handleCloseModals={handleCloseModals}
      /> : ''}

    </>
  )
}

export default Accounting
