import * as React from "react";
import {useEffect} from 'react';
import './vzn_list.scss';
import VznItem from './VznItem/VznItem.tsx';
import {useVznListStore} from '@/stores/useVznListStore.ts';
import {useAuthStore} from '@/stores/useAuthStore.ts';
import {useDivisionsStore} from '@/stores/useDivisionsStore.ts';
import Header from "@/components/Header/Header.tsx";
import Modal from "@/components/UI/Modal/Modal.tsx";
import Filter from "@/components/Filter/Filter.tsx";
import CreateVznConsumption from "@/components/CreateVznConsumption/CreateVznConsumption.tsx";
import {useModalStore} from "@/stores/useModalStore.ts";

const VznList: React.FC = () => {
    const {vznList, loading, error} = useVznListStore();
    const {divisions, fetchDivisions} = useDivisionsStore();
    const authToken = useAuthStore((state) => state.authToken);
    const { isFilterModalOpen, isCreateVznModalOpen, closeFilterModal, closeCreateVznModal } = useModalStore();


    useEffect(() => {
        if (authToken) {
            fetchDivisions(authToken);
        }
    }, [authToken, fetchDivisions]);

    return (
        <>
            <Header
                headline="ВЗН УП (Расход)"
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
                        {vznList.map((item) => (
                            <VznItem key={item.Code} item={item} divisions={divisions}/>
                        ))}
                    </ul>
                )}
            </main>

            {/*modal filter*/}
            <Modal isOpen={isFilterModalOpen} onClose={closeFilterModal}>
                <Filter />
            </Modal>

            {/*modal filter*/}
            <Modal isOpen={isCreateVznModalOpen} onClose={closeCreateVznModal}>
                <CreateVznConsumption />
            </Modal>
        </>
    );
};

export default VznList;
