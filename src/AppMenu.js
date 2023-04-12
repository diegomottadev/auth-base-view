import React, { createRef, forwardRef, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';

const AppSubmenu = forwardRef((props, ref) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onMenuItemClick = (event, item, index) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
            event.preventDefault();
        }
        if (item.items) {
            setActiveIndex(activeIndex === index ? null : index);
            event.preventDefault();
        }
        if (props.root) {
            props.onRootMenuitemClick({
                originalEvent: event
            });
        }

        if (props.menuMode !== 'static') {
            const ink = getInk(event.currentTarget);
            if (ink) {
                removeClass(ink, 'p-ink-active');
            }
        }

        props.onMenuitemClick({
            originalEvent: event,
            item: item
        });
    };

    const onMenuItemMouseEnter = (index) => {
        if (props.root && props.menuActive && (props.menuMode === 'horizontal' || props.menuMode === 'slim') && !isMobile()) {
            setActiveIndex(index);
        }
    };

    const getInk = (el) => {
        for (let i = 0; i < el.children.length; i++) {
            if (typeof el.children[i].className === 'string' && el.children[i].className.indexOf('p-ink') !== -1) {
                return el.children[i];
            }
        }
        return null;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };

    const visible = (item) => {
        return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    };

    const isMobile = useCallback(() => {
        return window.innerWidth <= 896;
    }, []);

    const getLink = (item, index) => {
        const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon);
        const content = (
            <>
                <i className={menuitemIconClassName}></i>
                <span className="layout-menuitem-text">{item.label}</span>
                {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                {item.badge && <Badge value={item.badge} className="menuitem-badge" />}
                <Ripple />
            </>
        );
        const commonLinkProps = {
            style: item.style,
            className: classNames(item.class, 'p-ripple', { 'p-disabled': item.disabled, 'p-link': !item.to }),
            target: item.target,
            onClick: (e) => onMenuItemClick(e, item, index),
            onMouseEnter: () => onMenuItemMouseEnter(index)
        };

        if (item.url) {
            return (
                <a href={item.url} rel="noopener noreferrer" {...commonLinkProps}>
                    {content}
                </a>
            );
        } else if (!item.to) {
            return (
                <button type="button" {...commonLinkProps}>
                    {content}
                </button>
            );
        }

        return (
            <NavLink to={item.to} {...commonLinkProps} className={({ isActive }) => classNames(commonLinkProps.className, isActive ? 'active-route' : undefined)}>
                {content}
            </NavLink>
        );
    };

    const isMenuActive = (index) => {
        return props.root ? true : activeIndex === index;
    };

    const getItems = () => {
        const transitionTimeout = props.root ? 0 : { enter: 1000, exit: 450 };
        return props.items.map((item, i) => {
            if (visible(item)) {
                const submenuRef = createRef();
                const active = isMenuActive(i);
                const menuitemClassName = classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': activeIndex === i && !item.disabled });
                const link = getLink(item, i);
                const rootMenuItem = props.root && (
                    <div>
                        <span className="layout-menuitem-text">{item.label}</span>
                    </div>
                );
                const tooltip = (
                    <div className="layout-menu-tooltip">
                        <div className="layout-menu-tooltip-arrow"></div>
                        <div className="layout-menu-tooltip-text">{item.label}</div>
                    </div>
                );

                return (
                    <li key={item.label || i} className={menuitemClassName} role="menuitem">
                        {rootMenuItem}
                        {link}
                        {tooltip}
                        <CSSTransition nodeRef={submenuRef} classNames="layout-submenu-container" timeout={transitionTimeout} in={active} unmountOnExit>
                            <AppSubmenu ref={submenuRef} items={visible(item) && item.items} menuActive={props.menuActive} menuMode={props.menuMode} onMenuitemClick={props.onMenuitemClick}></AppSubmenu>
                        </CSSTransition>
                    </li>
                );
            }

            return null;
        });
    };

    useEffect(() => {
        if (!props.menuActive && (props.menuMode === 'horizontal' || props.menuMode === 'slim') && !isMobile()) {
            setActiveIndex(null);
        }
    }, [props, isMobile]);

    if (!props.items) {
        return null;
    }

    const items = getItems();

    return (
        <ul ref={ref} className={props.className}>
            {items}
        </ul>
    );
});

const AppMenu = (props) => {
    return <AppSubmenu className="layout-menu" items={props.model} menuMode={props.menuMode} menuActive={props.active} root onMenuitemClick={props.onMenuitemClick} onRootMenuitemClick={props.onRootMenuitemClick} />;
};

export default AppMenu;
