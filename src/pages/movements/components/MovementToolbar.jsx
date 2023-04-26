
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { saveAs } from 'file-saver';
import MovementService from '../../../services/movements/MovementService';

const MovementToolbar = () => {

    const navigate = useNavigate();

    const navigateToMovementForm = () => {
        navigate('/movements/new');
    };

    const onExportToExcel = async () => {
        const url = await MovementService.exportMovements();
        const filename = 'movimientos.xlsx'; // Nombre del archivo
        saveAs(url, filename); // Guardar el archivo en una ubicación específica
    };

    const toolbarLeftTemplate = () => {
        return (
            <>
                <Button label="Nuevo" icon="pi pi-plus-circle" style={{ marginRight: '.5em' }} onClick={navigateToMovementForm} />
            </>
        );
    };
    const toolbarRightTemplate = () => {
        return (
            <>
                <Button label="Exportar" icon="pi pi-file-excel" className="p-button-secondary" onClick={onExportToExcel} />
            </>
        );
    };



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar left={toolbarLeftTemplate} right={toolbarRightTemplate}></Toolbar>
                </div>
            </div>
        </div>
    );
   
}

export default MovementToolbar;