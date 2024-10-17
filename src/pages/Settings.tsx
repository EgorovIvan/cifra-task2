import * as React from "react";
import MainLayout from "../layouts/MainLayout.tsx";
import Icon from "../components/Icon/Icon.tsx";

const Settings: React.FC = () => {

  return (
      <MainLayout
          headline="Настройки"
          showCloseButton={false}
          hasBorder={true}
          isBlueBackground={true}
      >
        <ul className="main__list">
          <li className="main__list_item">
            <a href="#">
              <Icon src="../../public/img/settings/sett_1.svg" />
              <span>Настройка 1</span>
            </a>
          </li>
          <li className="main__list_item">
            <a href="#">
              <Icon src="../../public/img/settings/sett_2.svg" />
              <span>Настройка 2</span>
            </a>
          </li>
        </ul>
    </MainLayout>
  )
}

export default Settings
