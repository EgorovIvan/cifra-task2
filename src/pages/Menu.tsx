import * as React from "react";
import {Link} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.tsx";
import Icon from "@/components/Icon/Icon";
import BottomSheet from "@/components/UI/BottomSheet/BottomSheet.tsx";

const Menu: React.FC = () => {


    return (
        <>
            <MainLayout
                headline="Меню"
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            >
                <ul className="main__list">
                    <li className="main__list_item">
                        <Link to="/tasks">
                            <Icon src="../../public/img/menu/tasks.svg"/>
                            <span>Задачи</span>
                        </Link>
                    </li>
                    <li className="main__list_item">
                        <Link to="/settings">
                            <Icon src="../../public/img/menu/sett.svg"/>
                            <span>Настройки</span>
                        </Link>
                    </li>
                    <li className="main__list_item">
                        <Link to="/">
                            <Icon src="../../public/img/menu/system.svg"/>
                            <span>О системе</span>
                        </Link>
                    </li>
                </ul>
            </MainLayout>
            <BottomSheet/>
        </>
    )
}

export default Menu
