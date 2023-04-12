import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppTopbarP = (props) => {
    const navigate = useNavigate();

    return (
        <div className="layout-topbar">
            <button className="layout-topbar-logo p-link" onClick={() => navigate('/')}>
                <img id="layout-topbar-logo" src="assets/layout/images/logo-white.png" alt="babylon-layout" />
            </button>

            <button className="layout-menu-button p-link" onClick={props.onMenuButtonClick}>
                <i className="pi pi-bars"></i>
            </button>

            <button id="topbar-menu-button" className="p-link" onClick={props.onTopbarMenuButtonClick}>
                <i className="pi pi-ellipsis-v"></i>
            </button>
        </div>
    );
};

export default AppTopbarP;
