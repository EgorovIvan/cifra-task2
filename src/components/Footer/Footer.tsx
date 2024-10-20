import { Link, useNavigate } from "react-router-dom";

import './footer.scss'
import Icon from "../Icon/Icon";
import { useBottomSheetStore } from "../../stores/useBottomSheetStore.ts";

const Footer: React.FC = () => {

  const {appHeight, setYPosition} = useBottomSheetStore();
  const navigate = useNavigate();

  const handleBottomSheetOpen = () => {
    setYPosition(appHeight / 2)
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <footer className="footer">
        <Link to="/menu">
          <div className="footer__item">
            <Icon src='../../../public/img/footer/menu.svg' />
            <span>Меню</span>
          </div>
        </Link>
        <div className="footer__item"  onClick={handleBottomSheetOpen}>
          <Icon src='../../../public/img/footer/scaner.svg' />
          <span>Сканер</span>
        </div>
        <div className="footer__item" onClick={handleBack}>
          <Icon src='../../../public/img/footer/arrow_back.svg' />
          <span>Назад</span>
        </div>
      </footer>
    </>
  )
}

export default Footer
