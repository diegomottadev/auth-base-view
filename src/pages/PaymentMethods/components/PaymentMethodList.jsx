
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../../components/Error';
import PaymentMethodService from '../../../services/PaymentMethods/PaymentMethodService'
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast';

export const PaymentMethodList = () => {

    const dt = useRef(null);
    const toast = useRef();

    const navigate = useNavigate();

    const [methodPayments, setMethodPayments] = useState(false);
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
        async  function loadLazyData () {

            try {
                setLoadingDatatable(true);
                const {data:{data:result, total:total}} =  await PaymentMethodService.allPaymentMethods(lazyParams)
                setTotalRecords(total);
                setMethodPayments(result);
                setLoadingDatatable(false);
               // });
            } catch (err){
                console.log(err);
                console.warn('Hubo un problema con la carga del listado de formas de pago');
                setShowError(true);
                setLoadingDatatable(false);
            }
            
        }
        loadLazyData();
    },[lazyParams]) 


    const onPage = (event) => {        
        let _lazyParams = { ...lazyParams, ...event };
        setLazyParams(_lazyParams);
    }

    const onFilter = (e) => {
        const search = { search: { name: e.target.value } };
        let _lazyParams = { ...lazyParams, ...search };
        _lazyParams['first'] = 0;
        setLazyParams(_lazyParams);
    }

    const onEditWayPay = (methodPaymentId) => {
        navigate(`/paymentMethods/${methodPaymentId}/edit`);
    }


    const onDeleteWayPay = (methodPaymentId) => {
        Swal.fire({
            title: '',
            text: '¿Confirma eliminar la forma de pago permanentemente?',
            showCancelButton: true,
            confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
            cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#fbc02d',
          }).then( async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                  let wayPayDelete = await PaymentMethodService.deletePaymentMethod(methodPaymentId);
                //   Swal.fire('', `${wayPayDelete.message}`, 'success')
                  toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `${wayPayDelete.message}`,
                    life: 3000,
                });
                  setLazyParams({...lazyParams,page: lazyParams.page});
            } 
        })
    }

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
                <Button tooltip={"Editar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-pencil" className="p-button-raised p-button-success p-mr-2" onClick={() => onEditWayPay(rowData.id)} />
                <Button tooltip={"Eliminar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeleteWayPay(rowData.id)} />

                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteTeacher(rowData)} /> */}
            </div>
        );
    }

    if(showError){
        return(
                <Error mensaje={'Hubo un problema con la carga del listado de formas de pago'}></Error>
        );
    } 

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Formas de pago</h5>
                     <Toast ref={toast} />

                     <DataTable ref={dt} value={methodPayments} lazy
                        paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                        loading={loadingDatatable}
                        className="p-datatable-gridlines" header={header}
                        >
                        <Column field="name" header="Nombre"  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="description" header="Descripción"  ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 
                </div>
            </div>
        </div>
    )

            
}
export default PaymentMethodList;