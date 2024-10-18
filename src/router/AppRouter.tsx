import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Menu from '../pages/Menu.tsx';
import Tasks from "../pages/Tasks.tsx";
import Settings from "../pages/Settings.tsx";
import Accounting from "../pages/Accounting.tsx";
import Test from "../test/Test.tsx";

const AppRouter: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/tasks" element={<Tasks/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/accounting" element={<Accounting/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </Router>
    )
};

export default AppRouter;
