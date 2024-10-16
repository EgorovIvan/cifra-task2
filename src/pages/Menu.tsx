import * as React from "react";
import {Link} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.tsx";

const Menu: React.FC = () => {

  return (
      <MainLayout
          headline="Меню"
          showCloseButton={false}
          hasBorder={true}
          isBlueBackground={true}
      >
        <ul className="main__list">
          <li className="main__list-item">
            <Link to="/tasks">
              <img src="./img/menu/tasks.svg" alt="tasks"/>
                <span>Задачи</span>
            </Link>
          </li>
          <li className="main__list-item">
            <Link to="/settings">
              <img src="./img/menu/sett.svg" alt="settings"/>
                <span>Настройки</span>
            </Link>
          </li>
          <li className="main__list-item">
            <Link to="/">
              <img src="./img/menu/system.svg" alt="info system"/>
                <span>О системе</span>
            </Link>
          </li>
        </ul>
    </MainLayout>
  )
}

export default Menu
