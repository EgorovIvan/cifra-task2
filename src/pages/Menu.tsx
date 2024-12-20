import * as React from "react";
import {Link} from "react-router-dom";
import Icon from "@/components/Icon/Icon";
import BottomSheet from "@/components/UI/BottomSheet/BottomSheet.tsx";
import Header from "@/components/Header/Header.tsx";

const Menu: React.FC = () => {

    return (
        <>
            <Header
                headline="Меню"
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            />
            <main className={'main'}>
                <ul className="main__list">
                    <li className="main__list_item">
                        <Link to="/tasks">
                            <Icon src="./public/img/menu/tasks.svg"/>
                            <span>Задачи</span>
                        </Link>
                    </li>
                    <li className="main__list_item">
                        <Link to="/settings">
                            <Icon src="./public/img/menu/sett.svg"/>
                            <span>Настройки</span>
                        </Link>
                    </li>
                    <li className="main__list_item">
                        <Link to="/">
                            <Icon src="./public/img/menu/system.svg"/>
                            <span>О системе</span>
                        </Link>
                    </li>
                </ul>
            </main>
            <BottomSheet/>
        </>
    )
}

export default Menu
