import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import {Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import AppTopbarP from './AppTopbarP';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppInlineProfile from './AppInlineProfile';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

 /*
      Importaciones propias  
 */

import {  initAxiosInterceptors } from './helpers/auth-helpers';
import { Login } from './pages/Login';
import useToken from './hooks/useToken';
import { me } from './services/auth/Authorization';
import EmptyPage from './pages/EmptyPage';
import RolePage from './pages/security/roles/RolePage';
import RoleForm from './pages/security/roles/form/RoleForm';
import UserForm from './pages/security/users/form/UserForm';
import UserPage from './pages/security/users/UserPage';




initAxiosInterceptors() // lo usa en el useEffect para preguntar si ese token lo tiene el usuario


const App = () => {

    /*
      Aca empieza mis estados  
    */
    const { token, setToken,isExpired,deleteToken } = useToken();

    const [usuario, setUsuario] = useState(null); // no sabemos si hay un usuario autenticado
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const [error, setError] = useState(null);

    /*
      Termina mis estados  
    */

    /*
      Estados para el funcionamiento del template
    */

    const [menuActive, setMenuActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);

    const [menuMode, setMenuMode] = useState('static');
    const [darkMenu, setDarkMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [inlineMenuActive, setInlineMenuActive] = useState(false);
    const [profileMode, setProfileMode] = useState('inline');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const navigate = useNavigate();

    let menuClick = false;
    let configClick = false;
    let inlineMenuClick = false;

    // const breadcrumb = [
    //     { path: '/home', parent: 'General', label: 'Estadísticas' },
    //     { path: '/movements', parent: 'Secciones', label: 'Movimientos' },
    //     { path: '/categories', parent: 'Secciones', label: 'Categorias' },
    //     { path: '/paymentMethods', parent: 'Secciones', label: 'Formas de pagos' },

    // ];

    const menu = [
        // {
        //     label: 'Panel de control',
        //     icon: 'pi pi-fw pi-home',
        //     items: [{ label: 'General', icon: 'pi pi-fw pi-home', to: '/' }]
        // },

        {
            icon: 'pi pi-fw pi-align-left',
            items: [
                {
                    label: 'Seguridad',
                    icon: 'pi pi-fw pi-align-left',
                    items: [
                        { label: 'Roles', icon: 'pi pi-fw pi-money-bill', to: '/roles' },
                        { label: 'Usuarios', icon: 'pi pi-fw pi-money-bill', to: '/users' },
                    ]
                },
                // {
                //     label: 'Submenu 2.2',
                //     icon: 'pi pi-fw pi-align-left',
                //     items: [
                //         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                //         { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-align-left' }
                //     ]
                // }
            ]
        },


        

    ];

    /*
        Implementacion para autenticacion de usuario:
        Verifica si existe el token  para validar su ingreso al sistema como asi realizar
        acciones sobre el mismo
    */



    useEffect(() => {
        async function cargandoUsuario() {
            if (isExpired) {
                setCargandoUsuario(false);
                return;
            }
            try {
                const { data } = await me();
                // console.log('user',data);
                setUsuario(data);
                setCargandoUsuario(false)
            } catch (error) {
                setCargandoUsuario(false)
                setError(error)
            }
        }

        cargandoUsuario();
    }, [token])


    function mostrarError(mensaje) {
        //alert();
        setError(mensaje);
    }



    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);


    // let meta = breadcrumb.find((obj) => {
    //     return obj.path === location.pathname;
    // });

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);

        if (e.value === 'horizontal') {
            setProfileMode('popup');
        }
    };

    const onMenuColorChange = (e) => {
        setDarkMenu(e.value);
    };

    const onProfileChange = (e) => {
        setProfileMode(e.value);
    };

    const onDocumentClick = () => {
        // if (!topbarItemClick) {
        //     setActiveTopbarItem(null);
        //     setTopbarMenuActive(false);
        // }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (!inlineMenuClick && profileMode === 'inline' && isSlim() && !isMobile()) {
            setInlineMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        inlineMenuClick = false;
        configClick = false;
        menuClick = false;
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const onMenuClick = () => {
        menuClick = true;

        if (inlineMenuActive && !inlineMenuClick) {
            setInlineMenuActive(false);
        }
    };

    const isMenuVisible = () => {
        if (isDesktop()) {
            if (menuMode === 'static') return !staticMenuDesktopInactive;
            else if (menuMode === 'overlay') return overlayMenuActive;
            else return true;
        } else {
            return true;
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        // setTopbarMenuActive(false);

        if (isOverlay() && !isMobile()) {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        } else {
            if (isDesktop()) {
                setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
            } else {
                setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
            }
        }

        event.preventDefault();
    };

    const onProfileButtonClick = (event) => {
        setInlineMenuActive((prevInlineMenuActive) => !prevInlineMenuActive);
        inlineMenuClick = true;

        if (isSlim() || isHorizontal()) {
            setMenuActive(false);
        }
    };

    // const onTopbarMenuButtonClick = (event) => {
    //     //topbarItemClick = true;
    //     //setTopbarMenuActive((prevTopbarMenuActive) => !prevTopbarMenuActive);

    //     hideOverlayMenu();

    //     event.preventDefault();
    // };
    const onTopbarItemClick = (event, item) => {
 
        deleteToken()
        navigate(`/`);
        event.preventDefault();
    };

    const onTopbarMenuActive= ()=>{
        setTopbarMenuActive(!topbarMenuActive)
    }

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 896;
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isStatic = () => {
        return menuMode === 'static';
    };

    const hasInlineProfile = profileMode === 'inline' && !isHorizontal();

    const containerClassName = classNames('layout-wrapper', {
        'layout-static': isStatic(),
        'layout-overlay': isOverlay(),
        'layout-overlay-active': overlayMenuActive,
        'layout-horizontal': isHorizontal(),
        'layout-slim': isSlim(),
        'layout-static-inactive': staticMenuDesktopInactive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-menu-dark': darkMenu,
        'layout-menu-light': !darkMenu,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple
    });

    const menuContainerClassName = classNames('layout-menu-container', { 'layout-menu-container-inactive': !isMenuVisible() });

    const LoginRoute = () =>{
        return (
            <div className={containerClassName} onClick={onDocumentClick}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
               
                <AppTopbarP
                topbarMenuActive={topbarMenuActive}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuActive}
                onTopbarItemClick={onTopbarItemClick}
                isHorizontal={isHorizontal()}
                profileMode={profileMode}
                isMobile={isMobile}
            />
    
                <div className={menuContainerClassName} onClick={onMenuClick}>
                    <div className="layout-menu-logo">
                        <button className="p-link text-center" onClick={() => navigate('/')}>
                            {/* <img  id="layout-menu-logo" src="assets/layout/images/pesitos-sidebar.png" library="babylon-layout" alt="babylon-logo" /> */}
                        </button>
                    </div>
                    <div className="layout-menu-wrapper">
                        <div className="menu-scroll-content">
                            {hasInlineProfile && <AppInlineProfile onUser={usuario} inlineMenuActive={inlineMenuActive} onProfileButtonClick={onProfileButtonClick} />}
                            <AppMenu model={menu} menuMode={menuMode} active={menuActive} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick} />
                        </div>
                    </div>
                </div>
    
                <div className="layout-main">
                    {/* {meta != undefined ? 
                    <AppBreadcrumb meta={meta} /> :'' }
                     */}
                        <Routes>
                            <Route exact path="/" element={<EmptyPage />} />
                            <Route exact path="/roles" element={<RolePage />} />
                            <Route exact path="/roles/new" element={<RoleForm />}  />
                            <Route exact path="/roles/:roleId/edit" element={<RoleForm />} />
                            <Route exact path="/users" element={<UserPage />} />
                            <Route exact path="/users/new" element={<UserForm />}  />
                            <Route exact path="/users/:userId/edit" element={<UserForm />} />
                            {/* <Route exact path="/movements" element={<Movement />} />
                            <Route exact path="/categories" element={<Category />} />
                            <Route exact path="/paymentMethods" element={<PaymentMethod />} />
                            <Route exact path="/categories/new" element={<CategoryForm />}  />
                            <Route exact path="/categories/:categoryId/edit" element={<CategoryForm />} />
                            <Route exact path="/paymentMethods/new" element={<PaymentMethodForm/>}  />
                            <Route exact path="/paymentMethods/:paymentMethodId/edit" element={<PaymentMethodForm />} />
                            <Route exact path="/movements/new" element={<MovementForm/>}  />
                            <Route exact path="/movements/:movementId/edit" element={<MovementForm />} />
                            <Route exact path="/movements/:clasificationId/clasification/new" element={<MovementByClasification />} /> */}

                        </Routes>
    
                    <AppFooter />
                </div>
    
                <AppConfig
                    configActive={configActive}
                    menuMode={menuMode}
                    onMenuModeChange={onMenuModeChange}
                    isDarkMenu={darkMenu}
                    onMenuColorChange={onMenuColorChange}
                    profileMode={profileMode}
                    onProfileChange={onProfileChange}
                    onConfigClick={onConfigClick}
                    onConfigButtonClick={onConfigButtonClick}
                    rippleActive={ripple}
                    onRippleChange={onRippleChange}
                    inputStyle={inputStyle}
                    onInputStyleChange={onInputStyleChange}
                ></AppConfig>
    
                {staticMenuMobileActive && <div className="layout-mask"></div>}
            </div>
        );
    }

    const  LogoutRoute = ({ mostrarError ,error }) =>{
        return (
            <Routes>
                <Route path="/" element={<Login setToken={setToken} mostrarError={mostrarError} error={error}  />} />
            </Routes>
        );
    }

    if(isExpired) return <div className="layout-main"><LogoutRoute mostrarError={mostrarError} error={error} /></div>
    
    return (
        <div>
           <LoginRoute mostrarError={mostrarError} usuario={usuario}  />) 
        </div>
    );
};

export default App;
