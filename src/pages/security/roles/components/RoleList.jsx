import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import Error from '../../../../components/Error';
import RoleToolbar from './RoleToolbar';
import { roleServiceInstance } from '../../../../services/security/roles/RoleService';

const RoleList = () => {
    // Refs
    const dt = useRef(null);
    const toast = useRef();

    // Hooks
    const navigate = useNavigate();
    const [roles, setRoles] = useState(false);
    const [loadingDatatable, setLoadingDatatable] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showError, setShowError] = useState(false);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        search: null
    });

    // Effects
    useEffect(() => {
        loadLazyData();
    }, [lazyParams]);

    // Functions
    const loadLazyData = async () => {
        try {
            setLoadingDatatable(true);
            const { data: { data: result, count: total } } = await roleServiceInstance.allRoles(lazyParams)
            setTotalRecords(total);
            setRoles(result);
            setLoadingDatatable(false);
        } catch (err) {
            console.log(err);
            console.warn('Hubo un problema con la carga del listado de roles');
            setShowError(true);
            setLoadingDatatable(false);
        }
    };

    const onPage = (event) => {
        let _lazyParams = { ...lazyParams, ...event };
        setLazyParams(_lazyParams);
    };

    const onFilter = (e) => {
        const search = { search: { name: e.target.value } };
        let _lazyParams = { ...lazyParams, ...search };
        _lazyParams['first'] = 0;
        setLazyParams(_lazyParams);
    };

    const onEditRole = (roleId) => {
        navigate(`/roles/${roleId}/edit`);
    };

    const onDeleteRole = async (roleId) => {
        try {
            const result = await Swal.fire({
                title: '',
                text: '¿Confirma eliminar el rol permanentemente?',
                showCancelButton: true,
                confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
                cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
                confirmButtonColor: '#2196F3',
                cancelButtonColor: '#fbc02d',
            });

            if (result.isConfirmed) {
                const roleDelete = await roleServiceInstance.deleteRole(roleId);
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `${roleDelete.message}`,
                    life: 3000,
                });
                setLazyParams({ ...lazyParams, page: lazyParams.page });
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        if (error.response) {
            console.error('Error de solicitud:', error.response.data);
            Swal.fire('Error', 'Hubo un error al procesar la solicitud', 'error');
        } else if (error.request) {
            console.error('Error de respuesta:', error.request);
            Swal.fire('Error', 'No se recibió respuesta del servidor', 'error');
        } else {
            console.error('Error:', error.message);
            Swal.fire('Error', 'Ocurrió un error al realizar la solicitud', 'error');
        }
    };

    // Templates
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0"></h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => onFilter(e)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button tooltip={"Editar"} tooltipOptions={{ position: 'top' }} icon="pi pi-pencil" className="p-button-raised p-button-success p-mr-2" onClick={() => onEditRole(rowData.id)} />
                <Button tooltip={"Eliminar"} tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeleteRole(rowData.id)} />
            </div>
        );
    }

    // Render
    if (showError) {
        return (
            <Error mensaje={'Hubo un problema con la carga del listado de roles'}></Error>
        );
    }

    return (
        <div>
            <RoleToolbar params={lazyParams.search} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Roles</h5>
                        <Toast ref={toast} />
                        <DataTable ref={dt} value={roles} lazy
                            paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                            loading={loadingDatatable}
                            className="p-datatable-gridlines" header={header}
                        >
                            <Column field="name" header="Nombre" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                            <Column field="description" header="Descripción" ></Column>
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleList;
