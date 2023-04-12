import React, { useState } from 'react';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';

const AppConfig = (props) => {
    const [themeColor, setThemeColor] = useState('blue');

    const componentThemes = [
        { name: 'Amber Accent', file: 'amber', color: '#FFC107' },
        { name: 'Blue Accent', file: 'blue', color: '#2196F3' },
        { name: 'Blue Gray Accent', file: 'bluegray', color: '#607D8B' },
        { name: 'Brown Accent', file: 'brown', color: '#795548' },
        { name: 'Cyan Accent', file: 'cyan', color: '#00BCD4' },
        { name: 'Deep Orange Accent', file: 'deeporange', color: '#FF5722' },
        { name: 'Deep Purple Accent', file: 'deeppurple', color: '#673AB7' },
        { name: 'Green Accent', file: 'green', color: '#4CAF50' },
        { name: 'Indigo Accent', file: 'indigo', color: '#3F51B5' },
        { name: 'Light Blue Accent', file: 'lightblue', color: '#03A9F4' },
        { name: 'Light Green Accent', file: 'lightgreen', color: '#8BC34A' },
        { name: 'Lime Accent', file: 'lime', color: '#CDDC39' },
        { name: 'Orange Accent', file: 'orange', color: '#FF9800' },
        { name: 'Pink Accent', file: 'pink', color: '#E91E63' },
        { name: 'Purple Accent', file: 'purple', color: '#9C27B0' },
        { name: 'Teal Accent', file: 'teal', color: '#00796B' },
        { name: 'Yellow Accent', file: 'yellow', color: '#FFEB3B' }
    ];

    const changeComponentTheme = (theme) => {
        changeStyleSheetUrl('theme-css', theme, 'theme-');
        changeStyleSheetUrl('layout-css', theme, 'layout-');
        setThemeColor(theme);
    };

    const changeStyleSheetUrl = (id, value, prefix) => {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + value + '.css';
        let newURL = urlTokens.join('/');
        replaceLink(element, newURL);

        let topbarLogo = document.getElementById('layout-topbar-logo');
        let menuLogo = document.getElementById('layout-menu-logo');

        if (value.localeCompare('yellow') === 0 || value.localeCompare('lime') === 0) {
            topbarLogo.src = 'assets/layout/images/logo-black.png';
            menuLogo.src = 'assets/layout/images/logo-black.png';
        } else {
            topbarLogo.src = 'assets/layout/images/logo-white.png';
            menuLogo.src = 'assets/layout/images/logo-white.png';
        }
    };

    const replaceLink = (linkElement, href) => {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            const _linkElement = document.getElementById(id);
            _linkElement && _linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    };

    const getComponentThemes = () => {
        return (
            <div className="layout-themes">
                {componentThemes.map((theme) => {
                    return (
                        <div key={theme.name}>
                            <button type="button" className="p-link" style={{ cursor: 'pointer', backgroundColor: theme.color }} onClick={() => changeComponentTheme(theme.file)} title={theme.file}>
                                {themeColor === theme.file && <i className="pi pi-check"></i>}
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    const componentThemesElement = getComponentThemes();
    const configClassName = classNames('layout-config', { 'layout-config-active': props.configActive });
    return (
        <div id="layout-config">
            {/* <button type="button" id="layout-config-button" className="layout-config-button p-link" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button> */}
            <div className={configClassName} onClick={props.onConfigClick}>
                <h5>Menu Mode</h5>
                <div className="field-radiobutton">
                    <RadioButton name="menuMode" value="static" checked={props.menuMode === 'static'} inputId="mode1" onChange={props.onMenuModeChange}></RadioButton>
                    <label htmlFor="mode1">Static</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="menuMode" value="overlay" checked={props.menuMode === 'overlay'} inputId="mode2" onChange={props.onMenuModeChange}></RadioButton>
                    <label htmlFor="mode2">Overlay</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="menuMode" value="horizontal" checked={props.menuMode === 'horizontal'} inputId="mode3" onChange={props.onMenuModeChange}></RadioButton>
                    <label htmlFor="mode4">Horizontal</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="menuMode" value="slim" checked={props.menuMode === 'slim'} inputId="mode4" onChange={props.onMenuModeChange}></RadioButton>
                    <label htmlFor="mode4">Slim</label>
                </div>

                <h5>Menu Color</h5>
                <div className="field-radiobutton">
                    <RadioButton name="colorScheme" value={true} checked={props.isDarkMenu} inputId="menu_color1" onChange={props.onMenuColorChange}></RadioButton>
                    <label htmlFor="menu_color1">Dark</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="colorScheme" value={false} checked={!props.isDarkMenu} inputId="menu_color2" onChange={props.onMenuColorChange}></RadioButton>
                    <label htmlFor="menu_color2">Light</label>
                </div>

                <h5>Input Style</h5>
                <div className="field-radiobutton">
                    <RadioButton inputId="input_outlined" name="inputstyle" value="outlined" checked={props.inputStyle === 'outlined'} onChange={(e) => props.onInputStyleChange(e.value)} />
                    <label htmlFor="input_outlined">Outlined</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="input_filled" name="inputstyle" value="filled" checked={props.inputStyle === 'filled'} onChange={(e) => props.onInputStyleChange(e.value)} />
                    <label htmlFor="input_filled">Filled</label>
                </div>

                <h5>Ripple Effect</h5>
                <InputSwitch checked={props.rippleActive} onChange={props.onRippleChange} />

                <h5>User Profile</h5>
                <div className="field-radiobutton">
                    <RadioButton name="profileMode" value="inline" checked={props.profileMode === 'inline'} disabled={props.menuMode === 'horizontal'} inputId="profile_mode1" onChange={props.onProfileChange}></RadioButton>
                    <label htmlFor="profile_mode1">Inline</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="profileMode" value="popup" checked={props.profileMode === 'popup'} disabled={props.menuMode === 'horizontal'} inputId="profile_mode2" onChange={props.onProfileChange}></RadioButton>
                    <label htmlFor="profile_mode2">Popup</label>
                </div>

                <h5>Themes</h5>
                {componentThemesElement}
            </div>
        </div>
    );
};

export default AppConfig;
