import * as React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Auth from '../pages/Auth/Auth.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Menu from "@/pages/Menu.tsx";
import Tasks from "@/pages/Tasks.tsx";
import Accounting from "@/pages/Accounting.tsx";
import Settings from "@/pages/Settings.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import VznList from "@/components/VznList/VznList.tsx";
import VznItemInfo from "@/pages/VznItemInfo.tsx";

const AppRouter: React.FC = () => {

    return (

        <Router>
            <Routes>
                <Route path="/login" element={<Auth/>}/>

                {/* Защищённые маршруты */}
                <Route element={<ProtectedRoute/>}>

                    <Route path="/" element={<MainLayout/>}>
                        <Route path="menu" element={<Menu/>}/>
                        <Route path="tasks" element={<Tasks/>}/>
                        <Route path="accounting" element={<Accounting/>}/>
                        <Route path="vzn-expense" element={<VznList/>}/>
                        <Route path="vzn-expense/:vznItemId" element={<VznItemInfo />} />
                        <Route path="settings" element={<Settings/>}/>
                    </Route>

                </Route>

                {/* Если нет токена, по умолчанию переходим на /login */}
                <Route path="*" element={<Navigate to="/test" replace/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;
