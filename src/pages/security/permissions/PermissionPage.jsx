import React  from 'react';
import PermissionList from './components/PermissionList';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';

const PermissionPage = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Permisos'} /> 
           <div className="layout-content">
             <PermissionList />
           </div>
        </div>
    );
}
export default PermissionPage;
