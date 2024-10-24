import * as React from "react";
import Icon from "../components/Icon/Icon.tsx";
import {Link} from "react-router-dom";
import Header from "@/components/Header/Header.tsx";

const Tasks: React.FC = () => {

    return (
        <>
            <Header
                headline="Задачи"
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            />
            <main className={'main'}>
                <ul className="main__list">
                    <li className="main__list_item">

                        <a href="#" id="link-task">
                            <Icon src="../../img/settings/sett_1.svg"/>
                            <span>Складской учёт</span>
                        </a>

                    </li>
                    <li className="main__list_item">
                        <Link to="/accounting">
                            <Icon src="../../img/settings/sett_2.svg"/>
                            <span>Учёт в производстве</span>
                        </Link>
                    </li>
                </ul>
            </main>
        </>
    )
}

export default Tasks
