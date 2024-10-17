import {Link} from "react-router-dom";
import './footer.scss'
import Icon from "../Icon/Icon";
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
            <Icon src='../../../public/img/footer/menu.svg' />
            <span>Меню</span>
          </div>
        </Link>
        {/*<Link to="/">*/}
          <div className="footer__item"  onClick={handleBottomSheetOpen}>
            <Icon src='../../../public/img/footer/scaner.svg' />
            <span>Сканер</span>
          </div>
        {/*</Link>*/}
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
