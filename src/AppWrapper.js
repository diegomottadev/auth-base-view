import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Access } from './pages/Access';
import { Error } from './pages/Error';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Wizard } from './pages/Wizard';

const AppWrapper = () => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/access" element={<Access />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default AppWrapper;
