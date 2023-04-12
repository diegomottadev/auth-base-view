import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppBreadcrumb = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const label = props.meta.label;

    return (
        <div className="route-bar">
            <div className="route-bar-breadcrumb">
                <ul>
                    <li>
                        <button type="button" className="p-link" onClick={() => navigate('/')}>
                            <i className="pi pi-home" />
                        </button>
                    </li>
                    <li>/</li>
                    {location.pathname === '/' ? (
                        <li>Dashboard</li>
                    ) : (
                        <li>
                            <button className="p-link">{label}</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AppBreadcrumb;
