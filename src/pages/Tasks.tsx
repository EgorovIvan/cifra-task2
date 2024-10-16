import * as React from "react";
import {Link} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";

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
              <img src="./img/settings/sett_1.svg" alt="setting 1"/>
                <span>Складской учёт</span>
            </a>

          </li>
          <li className="main__list-item">
            <Link to="/accounting">
              <img src="./img/settings/sett_2.svg" alt="setting 2"/>
                <span>Учёт в производстве</span>
            </Link>
          </li>
        </ul>
      </MainLayout>
    </>
  )
}

export default Tasks
