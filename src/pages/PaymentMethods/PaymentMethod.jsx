import React  from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import PaymentMethodList from './components/PaymentMethodList';

import PaymentMethodToolbar  from './components/PaymentMethodToolbar';


const PaymentMethod = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Formas de Pago'} /> 
           <div className="layout-content">
            <PaymentMethodToolbar />
            <PaymentMethodList />
           </div>
        </div>
    );
}
export default PaymentMethod;
