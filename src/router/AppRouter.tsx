import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Menu from '../pages/Menu.tsx';
import Tasks from "../pages/Tasks.tsx";
import Settings from "../pages/Settings.tsx";
import Accounting from "../pages/Accounting.tsx";
import Auth from '../pages/Auth/Auth.tsx';
import ProtectedRoute from './ProtectedRoute';
import Test2 from "@/test/Test2.tsx";

const AppRouter: React.FC = () => {

  return (
    <Router>
      <Routes>
        {/* Страница авторизации */}
        <Route path="/login" element={<Auth />} />

        {/* Защищенные маршруты */}
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting"
          element={
            <ProtectedRoute>
              <Accounting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
              <ProtectedRoute>
              <Test2 />
              </ProtectedRoute>
          }
        />

        {/* Если нет токена, по умолчанию переходим на /login */}
        <Route path="*" element={<Navigate to="/test" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
