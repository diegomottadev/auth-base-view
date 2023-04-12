import React  from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import WayPayList from './components/WayPayList';

import WayPayToolbar  from './components/WayPayToolbar';


const WayPay = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Formas de Pago'} /> 
           <div className="layout-content">
            <WayPayToolbar />
            <WayPayList />
           </div>
        </div>
    );
}
export default WayPay;
