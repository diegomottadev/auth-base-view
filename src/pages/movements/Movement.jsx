import React  from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import MovementList from './components/MovementList';

import MovementToolbar  from './components/MovementToolbar';


const Movement = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Movimientos'} /> 
           <div className="layout-content">
            <MovementToolbar />
            <MovementList />
           </div>
        </div>
    );
}
export default Movement;
