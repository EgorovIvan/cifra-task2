import * as React from 'react';
import Footer from '../components/Footer/Footer.tsx';
import {Outlet} from "react-router-dom";


const MainLayout: React.FC = () => {

    return (
        <>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default MainLayout;
