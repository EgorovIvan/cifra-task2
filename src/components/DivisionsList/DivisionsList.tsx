import * as React from "react";
import {useEffect} from 'react';
import {useAuthStore} from '@/stores/useAuthStore.ts';
import {useDivisionsStore} from '@/stores/useDivisionsStore.ts';
import Header from "@/components/Header/Header.tsx";
import { useModalStore } from "@/stores/useModalStore";

import './divisions_list.scss';
import {DivisionsProps} from "@/interfaces/DivisionsProps.ts";

interface Props {
    onSelectValue(divisionName: string): void;
    onSelectCode(divisionCode: number): void;
}

const DivisionsList: React.FC<Props> = ({onSelectValue, onSelectCode}) => {
    const {divisions, loading, error, fetchDivisions} = useDivisionsStore();
    const authToken = useAuthStore((state) => state.authToken);
    const {closeDivisionsModal} = useModalStore();

    useEffect(() => {
        if (authToken) {
            fetchDivisions(authToken);
        }
    }, [authToken, fetchDivisions]);

    const handleItemClick = (divisions: DivisionsProps) => {
        onSelectValue(divisions.Name);
        onSelectCode(divisions.Code)
        closeDivisionsModal();
    }

    return (
        <>
            <Header
                headline="Список подразделений"
                showCloseButton={true}
                onCloseButtonClick={closeDivisionsModal}
                hasBorder={false}
                isBlueBackground={false}
            />
            <main className={'main'}>
                {loading ? <p>Загрузка...</p> : null}
                {error ? <p>{error}</p> : null}

                {!loading && !error && (
                    <ul className="divisions_list" id="list">
                        {divisions.map((item) => (
                            <li key={item.Code} className="list_item" onClick={() => handleItemClick(item)}>
                                {item.Name}
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
};

export default DivisionsList;
