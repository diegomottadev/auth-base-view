import React from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
const AppTopbarP = (props) => {
    const navigate = useNavigate();
    const topbarMenuClassName = classNames('topbar-menu fadeInDown', { 'topbar-menu-visible': props.topbarMenuActive });
    const activeTopbarItemClassName = (name) => {
        return name === props.activeTopbarItem ? 'active-topmenuitem' : null;
    };
    return (
        <div className="layout-topbar">
            <button className="layout-topbar-logo p-link" onClick={() => navigate('/')}>
            <img id="layout-topbar-logo" src="assets/layout/images/pesitos-sidebar.png" alt="babylon-layout" />
            </button>
            <button className="layout-menu-button p-link" onClick={props.onMenuButtonClick}>
                <i className="pi pi-bars"></i>
            </button>

            <button id="topbar-menu-button" className="p-link" onClick={props.onTopbarMenuButtonClick}>
                <i className="pi pi-ellipsis-v"></i>
            </button>

            <ul className={topbarMenuClassName}>
                   <Tooltip target=".custom-target-icon" />
                    <li className={activeTopbarItemClassName('settings')}>
                        <button  className="custom-target-icon p-link" data-pr-tooltip="Salir"
                             data-pr-position="left" onClick={(e) => props.onTopbarItemClick(e, 'settings')}>
                            <i  className="topbar-icon pi pi-sign-out"></i>
                            <span className="topbar-item-name">Salir</span>
                        </button>
                        
                    </li>
            </ul>
        </div>
    );
};

export default AppTopbarP;

