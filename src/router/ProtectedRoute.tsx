import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.ts';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authToken = useAuthStore((state) => state.authToken);

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
