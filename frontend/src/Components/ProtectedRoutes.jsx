import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Unauthorized } from '../Pages';
import { Loading } from '../Components';

const ProtectedRoutes = () => {
    const { authenticated, loading } = useSelector((state) => state.user);

    // Show loading while checking authentication
    if (loading) {
        return <Loading />;
    }

    if (!authenticated) {
        return <Navigate to='/unauthorized' />;
    }

    return <Outlet />;
}


export default ProtectedRoutes;
