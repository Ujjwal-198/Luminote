import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RedirectHandler = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/index.html') {
            navigate('/', { replace: true });
        }
    }, [location.pathname, navigate]);

    return children;
};

export default RedirectHandler;