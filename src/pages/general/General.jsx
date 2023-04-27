import React from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import TagGeneral from './components/TagGeneral';



const General = () => {

    return (
        <div >
           <AppBreadcrumb meta={'General'} /> 
           <div className="layout-dashboard">

            <TagGeneral/>
           </div>
        </div>

    );
}
export default General;
