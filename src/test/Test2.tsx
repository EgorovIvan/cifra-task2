import * as React from "react";
import Modal from "@/components/UI/Modal/Modal.tsx";
import {useModalStore} from "@/stores/useModalStore.ts";
import CreateVznConsumption from "@/components/CreateVznConsumption/CreateVznConsumption.tsx";

const Test2: React.FC = () => {

    const { closeModal } = useModalStore();

    return (
        <>

                <ul className="main__list">
                    <button>Открыть</button>
                </ul>


            <Modal isOpen={true} onClose={closeModal}>
                <CreateVznConsumption />
            </Modal>
        </>
    )
}

export default Test2
