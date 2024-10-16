import * as React from "react";
import MainLayout from "../layouts/MainLayout.tsx";

const Settings: React.FC = () => {

  return (
      <MainLayout
          headline="Настройки"
          showCloseButton={false}
          hasBorder={true}
          isBlueBackground={true}
      >
        <ul className="main__list">
          <li className="main__list-item">
            <a href="#">
              <img src="./img/settings/sett_1.svg" alt="setting 1"/>
                <span>Настройка 1</span>
            </a>
          </li>
          <li className="main__list-item">
            <a href="#">
              <img src="./img/settings/sett_2.svg" alt="setting 2"/>
                <span>Настройка 2</span>
            </a>
          </li>
        </ul>
    </MainLayout>
  )
}

export default Settings
