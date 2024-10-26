import * as React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {AuthState, useAuthStore} from "@/stores/useAuthStore.ts";

const ProtectedRoute: React.FC = () => {

    const authToken = useAuthStore((state: AuthState) => state.authToken);

    return authToken ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoute;
