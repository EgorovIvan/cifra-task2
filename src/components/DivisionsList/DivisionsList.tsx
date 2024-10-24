import * as React from "react";
import {useEffect} from 'react';
import './divisions_list.scss';
import {useAuthStore} from '@/stores/useAuthStore.ts';
import {useDivisionsStore} from '@/stores/useDivisionsStore.ts';
import Header from "@/components/Header/Header.tsx";

const DivisionsList: React.FC = () => {
    const {divisions, loading, error, fetchDivisions} = useDivisionsStore();
    const authToken = useAuthStore((state) => state.authToken);

    useEffect(() => {
        if (authToken) {
            fetchDivisions(authToken);
        }
    }, [authToken, fetchDivisions]);

    return (
        <>
            <Header
                headline="Список подразделений"
                showCloseButton={false}
                hasBorder={false}
                isBlueBackground={false}
                centralButton
                rightButton
            />
            <main className={'main'}>
                {loading ? <p>Загрузка...</p> : null}
                {error ? <p>{error}</p> : null}

                {!loading && !error && (
                    <ul className="list_vzn" id="list">
                        {divisions.map((item) => (
                            <div>{item.Name}</div> 
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
};

export default DivisionsList;
