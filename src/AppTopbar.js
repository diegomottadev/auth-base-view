import React from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';

const AppTopbar = (props) => {
    const navigate = useNavigate();
    const topbarMenuClassName = classNames('topbar-menu fadeInDown', { 'topbar-menu-visible': props.topbarMenuActive });
    const profileItemClassName = classNames('user-profile', { 'active-topmenuitem': props.activeTopbarItem === 'profile' });
    const activeTopbarItemClassName = (name) => {
        return name === props.activeTopbarItem ? 'active-topmenuitem' : null;
    };

    const isProfilePopup = props.profileMode === 'popup' || props.isHorizontal;

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

            <ul className={topbarMenuClassName}>
                {isProfilePopup && (
                    <li className={profileItemClassName}>
                        <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'profile')}>
                            <img alt="babylon-layout" src="assets/layout/images/avatar.png" />
                            <span className="topbar-item-name">Arlene Welch</span>
                        </button>

                        <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-user"></i>
                                    <span>Profile</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-cog"></i>
                                    <span>Settings</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-envelope"></i>
                                    <span>Message</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-bell"></i>
                                    <span>Notifications</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                )}
                <li className={activeTopbarItemClassName('notifications')}>
                    <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'notifications')}>
                        <i className="topbar-icon pi pi-calendar"></i>
                        <span className="topbar-item-name">Notifications</span>
                    </button>
                    <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-tags"></i>
                                <span>Pending tasks</span>
                                <span className="topbar-submenuitem-badge">6</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-calendar-plus"></i>
                                <span>Meeting today at 3pm</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-download"></i>
                                <span>Download</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-lock"></i>
                                <span>Book flight</span>
                            </button>
                        </li>
                    </ul>
                </li>
                <li className={activeTopbarItemClassName('messages')}>
                    <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'messages')}>
                        <i className="topbar-icon pi pi-inbox"></i>
                        <span className="topbar-item-name">Messages</span>
                        <span className="topbar-badge">8</span>
                    </button>
                    <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-john.png" alt="babylon-layout" />
                                <span>Give me a call</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                <span>Reports attached</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-kevin.png" alt="babylon-layout" />
                                <span>About your invoice</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                <span>Meeting today</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                <span>Out of office</span>
                            </button>
                        </li>
                    </ul>
                </li>
                <li className={activeTopbarItemClassName('settings')}>
                    <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'settings')}>
                        <i className="topbar-icon pi pi-cog"></i>
                        <span className="topbar-item-name">Settings</span>
                    </button>
                    <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-pencil"></i>
                                <span>Change Theme</span>
                                <span className="topbar-submenuitem-badge">4</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-star"></i>
                                <span>Favorites</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-lock"></i>
                                <span>Lock Screen</span>
                                <span className="topbar-submenuitem-badge">2</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-image"></i>
                                <span>Wallpaper</span>
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default AppTopbar;
