import React, { useRef } from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import CategoryList from './components/CategoryList';

import CategoryToolbar  from './components/CategoryToolbar';


const Category = () => {

    return (
        <div >
            <AppBreadcrumb meta={'Categorias'} /> 
            <div className="layout-content">

                <CategoryToolbar />
                <CategoryList />
           </div>
        </div>
    );
}
export default Category;
