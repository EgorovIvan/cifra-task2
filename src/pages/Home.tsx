import { Link } from "react-router-dom";

import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Icon from "../components/Icon/Icon.tsx";

function Home() {


  return (
    <>
      <Header
        headline="Меню"
        showCloseButton={false}
        hasBorder={true}
        isBlueBackground={true}
      />
      <main className="main">
        <ul className="main__list">
          <li className="main__list-item">
            <Link to="/tasks">
                <Icon src="../../public/img/menu/tasks.svg" />
                <span>Задачи</span>
            </Link>
          </li>
          <li className="main__list-item">
            <Link to="/settings">
                <Icon src="../../public/img/menu/sett.svg" />
                <span>Настройки</span>
            </Link>
          </li>
          <li className="main__list-item">
            <Link to="/">
                <Icon src="../../public/img/menu/system.svg" />
                <span>О системе</span>
            </Link>
          </li>
        </ul>
      </main>
      <Footer/>
    </>
  )
}

export default Home
