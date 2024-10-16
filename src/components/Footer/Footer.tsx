import {Link} from "react-router-dom";
import './style.scss'
import Icon from "../Icon/Icon";

const Footer: React.FC = () => {

  return (
    <>
      <footer className="footer">
        <Link to="/">
          <div className="footer__item">
            <Icon src='../../../public/img/footer/menu.svg' />
            <span>Меню</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer__item">
            <Icon src='../../../public/img/footer/scaner.svg' />
            <span>Сканер</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer__item">
            <Icon src='../../../public/img/footer/arrow_back.svg' />
            <span>Назад</span>
          </div>
        </Link>
      </footer>
    </>
  )
}

export default Footer
