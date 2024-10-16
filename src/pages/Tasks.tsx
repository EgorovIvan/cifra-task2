import * as React from "react";
import Icon from "../components/Icon/Icon.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

import { Link } from "react-router-dom";

const Tasks: React.FC = () => {

  return (
    <>
      <MainLayout
          headline="Задачи"
          showCloseButton={false}
          hasBorder={true}
          isBlueBackground={true}
      >
        <ul className="main__list">
          <li className="main__list-item">

            <a href="#" id="link-task">
                <Icon src="../../img/settings/sett_1.svg" />
                <span>Складской учёт</span>
            </a>

          </li>
          <li className="main__list-item">
            <Link to="/accounting">
                <Icon src="../../img/settings/sett_2.svg" />
                <span>Учёт в производстве</span>
            </Link>
          </li>
        </ul>
      </MainLayout>
    </>
  )
}

export default Tasks
