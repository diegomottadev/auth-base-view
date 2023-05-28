import React, { useRef } from 'react';
import { classNames } from 'primereact/utils';
import { CSSTransition } from 'react-transition-group';

const AppInlineProfile = (props) => {
    const {onUser} = props 
    const menuRef = useRef(null);
    const profileClassName = classNames('layout-profile', { 'layout-profile-active': props.inlineMenuActive });
    const menuitemLinkTabindex = !props.inlineMenuActive ? '-1' : null;

    return (
        <div className={profileClassName}>
            <button type="button" onClick={props.onProfileButtonClick} className="p-link layout-profile-button">
                <img src="assets/layout/images/icon-users.png" alt="babylon-layout" />
                <div className="layout-profile-userinfo">
                    <span className="layout-profile-name">{onUser?.name}</span>
                    {/* <span className="layout-profile-role">Design Ops</span> */}
                </div>
                <i className="layout-profile-icon pi pi-angle-down"></i>
            </button>
            <CSSTransition nodeRef={menuRef} classNames="layout-profile-menu" in={props.inlineMenuActive} timeout={{ enter: 1000, exit: 400 }} unmountOnExit>
                <ul ref={menuRef} className="layout-profile-menu">
                    <li role="menuitem">
                        <button type="button" className="p-link" tabIndex={menuitemLinkTabindex}>
                            <i className="pi pi-user"></i>
                            <span>Perfil</span>
                        </button>
                    </li>
                    <li role="menuitem">
                        <button type="button" className="p-link" tabIndex={menuitemLinkTabindex}>
                            <i className="pi pi-cog"></i>
                            <span>Configuración</span>
                        </button>
                    </li>
                    {/* <li role="menuitem">
                        <button type="button" className="p-link" tabIndex={menuitemLinkTabindex}>
                            <i className="pi pi-envelope"></i>
                            <span>Mensajes</span>
                        </button>
                    </li> */}
                    <li role="menuitem">
                        <button type="button" className="p-link" tabIndex={menuitemLinkTabindex}>
                            <i className="pi pi-bell"></i>
                            <span>Notificaciones</span>
                        </button>
                    </li>
                </ul>
            </CSSTransition>
        </div>
    );
};

export default AppInlineProfile;
