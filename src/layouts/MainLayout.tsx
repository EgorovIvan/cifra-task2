import * as React from 'react';
import Footer from '../components/Footer/Footer.tsx';
import {Outlet} from "react-router-dom";
import Scan from "@/components/UI/Scan/Scan.tsx";
import Modal from "@/components/UI/Modal/Modal.tsx";
import {useModalStore} from "@/stores/useModalStore.ts";


const MainLayout: React.FC = () => {
    const {isScanModalOpen, closeScanModal} = useModalStore()
    return (
        <>
            <Outlet/>
            <Footer/>
            <Modal isOpen={isScanModalOpen} onClose={closeScanModal} >
                <Scan/>
            </Modal>
        </>
    );
};

export default MainLayout;
