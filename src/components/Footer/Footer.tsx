import './footer.scss'

import Icon from "../Icon/Icon";
import {Link} from "react-router-dom";
import {useBottomSheetStore} from "@/stores/useBottomSheetStore.ts";

const Footer: React.FC = () => {

  const {appHeight, setYPosition} = useBottomSheetStore();

  const handleBottomSheetOpen = () => {
    setYPosition(appHeight / 2)
  }

  return (
    <>
      <footer className="footer">
        <Link to="/">
          <div className="footer__item">
            <Icon src='../../img/footer/menu.svg' />
            <span>Меню</span>
          </div>
        </Link>
        {/*<Link to="/">*/}
          <div className="footer__item"  onClick={handleBottomSheetOpen}>
            <Icon src='../../img/footer/scaner.svg' />
            <span>Сканер</span>
          </div>
        {/*</Link>*/}
        <Link to="/">
          <div className="footer__item">
            <Icon src='../../img/footer/arrow_back.svg' />
            <span>Назад</span>
          </div>
        </Link>
      </footer>
    </>
  )
}

export default Footer
