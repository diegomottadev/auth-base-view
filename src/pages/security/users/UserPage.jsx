import React  from 'react';
import UserList from './components/UserList';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';

const UserPage = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Usuarios'} /> 
           <div className="layout-content">
             <UserList/>
           </div>
        </div>
    );
}
export default UserPage;
