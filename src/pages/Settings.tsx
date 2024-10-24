import * as React from "react";
import Icon from "../components/Icon/Icon.tsx";
import Header from "@/components/Header/Header.tsx";

const Settings: React.FC = () => {

    return (
        <>
            <Header
                headline="Настройки"
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            />
            <main className={'main'}>
                <ul className="main__list">
                    <li className="main__list_item">
                        <a href="#">
                            <Icon src="../../public/img/settings/sett_1.svg"/>
                            <span>Настройка 1</span>
                        </a>
                    </li>
                    <li className="main__list_item">
                        <a href="#">
                            <Icon src="../../public/img/settings/sett_2.svg"/>
                            <span>Настройка 2</span>
                        </a>
                    </li>
                </ul>
            </main>
        </>
    )
}

export default Settings
