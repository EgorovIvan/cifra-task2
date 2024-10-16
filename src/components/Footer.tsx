import { Link, useNavigate } from "react-router-dom";
import { useModalStore } from "../stores/modalStore";

import Icon from "./Icon/Icon";

const Footer: React.FC = () => {

  const { isModalOpen, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent) => {
    if (isModalOpen) {
      e.preventDefault();
      closeModal();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <footer className="footer">
        <Link to="/">
          <div className="footer__item">
            <Icon src="../../public/img/footer/menu.svg" />
            <span>Меню</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer__item">
            <Icon src="../../public/img/footer/scaner.svg" />
            <span>Сканер</span>
          </div>
        </Link>
        <div className="footer__item" onClick={handleBackClick}>
          <Icon src="../../public/img/footer/arrow_back.svg" />
          <span>Назад</span>
        </div>
      </footer>
    </>
  )
}

export default Footer
