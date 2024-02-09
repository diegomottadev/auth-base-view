import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import Error from '../../../../components/Error';
import UserToolbar from './UserToolbar';
import { userServiceInstance } from '../../../../services/security/users/UserService';

const UserList = () => {
    // Refs
    const dt = useRef(null);
    const toast = useRef();

    // Hooks
    const navigate = useNavigate();
    const [users, setUsers] = useState(false);
    const [loadingDatatable, setLoadingDatatable] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showError, setShowError] = useState(false);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        search: null
    });
    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);

    useEffect(() => {
        const loadLazyData = async () => {
            try {
                setLoadingDatatable(true);
                const { data: { data: result, count: total } } = await userServiceInstance.allUsers(lazyParams);
                setTotalRecords(total);
                setUsers(result);
            } catch (err) {
                console.error('Error al cargar los datos de usuarios:', err);
                setShowError(true);
            } finally {
                setLoadingDatatable(false);
            }
        };
        // Llama a loadLazyData al montar el componente
        loadLazyData();
    
     }, [lazyParams]);
    

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

    const onEditUser = (userId) => {
        navigate(`/users/${userId}/edit`);
    };

    const onDeleteUser = async (userId) => {
        try {
            const result = await Swal.fire({
                title: '',
                text: '¿Confirma eliminar el usuario permanentemente?',
                showCancelButton: true,
                confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
                cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
                confirmButtonColor: '#2196F3',
                cancelButtonColor: '#fbc02d',
            });

            if (result.isConfirmed) {
                const userDelete = await userServiceInstance.deleteUser(userId);
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `${userDelete.message}`,
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

            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => onFilter(e)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button tooltip={"Editar"} tooltipOptions={{ position: 'top' }} icon="pi pi-pencil" className="p-button-raised p-button-success p-mr-2" onClick={() => onEditUser(rowData.id)} />
                <Button tooltip={"Eliminar"} tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeleteUser(rowData.id)} />
            </div>
        );
    }


    const representativeBodyTemplate = (rowData) => {
        const imageUrl = rowData.urlImageProfile;
        const alt = `${rowData.name}-${rowData.id} `;
        return (
            <React.Fragment>
                <img
                    alt={alt}
                    src={`${imageUrl}`}
                    onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    width={32}
                    style={{ verticalAlign: 'middle' }}
                />
            </React.Fragment>
        );
    };


    // Render
    if (showError) {
        return (
            <Error mensaje={'Hubo un problema con la carga del listado de usuarios'}></Error>
        );
    }

    return (
        <div>
            <UserToolbar params={lazyParams.search} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Usuarios</h5>
                        <Toast ref={toast} />
                        {users && (
                        <DataTable ref={dt} value={users} lazy
                            paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                            loading={loadingDatatable}
                            className="p-datatable-gridlines" header={header}
                        >
                            <Column field="name" header="Nombre" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                            <Column field="email" header="Email" ></Column>
                            <Column
                            header="Foto de perfil"
                            filterMenuStyle={{ width: '14rem' }}
                            style={{ minWidth: '14rem' }}
                            body={representativeBodyTemplate}
                            />
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
