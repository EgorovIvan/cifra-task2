import { Link, useNavigate } from "react-router-dom";

import './footer.scss'
import Icon from "../Icon/Icon";

interface FooterProps{
  onScanButtonClick?: () => void
}

const Footer: React.FC<FooterProps> = (props) => {
  const navigate = useNavigate();
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
        <div className="footer__item" onClick={props.onScanButtonClick}>
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
