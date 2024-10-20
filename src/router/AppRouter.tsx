import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Menu from '../pages/Menu.tsx';
import Tasks from "../pages/Tasks.tsx";
import Settings from "../pages/Settings.tsx";
import Accounting from "../pages/Accounting.tsx";
import Test from "../test/Test.tsx";
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {

  return (
    <Router>
      <Routes>
        {/* Страница авторизации */}
        <Route path="/login" element={<Login />} />

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
              <Test />
            </ProtectedRoute>
          }
        />

        {/* Если нет токена, по умолчанию переходим на /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;