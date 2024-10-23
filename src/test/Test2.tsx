import * as React from "react";
import {Link} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.tsx";
import Icon from "@/components/Icon/Icon";
import BottomSheet from "@/components/UI/BottomSheet/BottomSheet.tsx";
import Modal from "@/components/UI/Modal/Modal.tsx";
import {useModalStore} from "@/stores/useModalStore.ts";
import CreateVznConsumption from "@/components/CreateVznConsumption/CreateVznConsumption.tsx";

const Test2: React.FC = () => {

    const { isModalOpen, openModal, closeModal } = useModalStore();

    return (
        <>
            <MainLayout
                headline=""
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            >
                <ul className="main__list">
                    <button>Открыть</button>
                </ul>
            </MainLayout>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateVznConsumption />
            </Modal>
        </>
    )
}

export default Test2
