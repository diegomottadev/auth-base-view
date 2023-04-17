

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import PaymentMethodService from '../../../services/PaymentMethods/PaymentMethodService';

export const PaymentMethodForm = () => {
    const toast = useRef();
    const navigate = useNavigate();
    const { paymentMethodId } = useParams();

    const [paymentMethod, setPaymentMethod] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchPaymentMethods = async () => {
          try {
            const {data:response} = await PaymentMethodService.getPaymentMethod(paymentMethodId);
            setPaymentMethod(response.data);
            setName(response.data.name);
            setDescription(response.data.description || '');
          } catch (error) {
            console.error(error);
          }
        };
    
        if (paymentMethodId) {
          fetchPaymentMethods();
        }
      }, [paymentMethodId]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name ) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }

        const data = {
            name,
            description,
        };

        try {
            let response;
            if (paymentMethod) {
                response = await PaymentMethodService.updatePaymentMethod(paymentMethod.id, data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Forma de pago ${name} actualizada`,
                    life: 3000,
                });
            } else {
                response = await PaymentMethodService.createPaymentMethod(data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Forma de pago ${name} creada`,
                    life: 3000,
                });
            }

            setName('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    };

    const goBackPaymentMethodList = () => {
        navigate('/paymentMethods');
      };

    return (
        <div>
            {paymentMethodId ?
            <AppBreadcrumb meta={'Formas de pagos / Editar'} /> : <AppBreadcrumb meta={'Formas de pagos / Nuevo'} />}
            <div className="layout-content">

            <Toast ref={toast} onHide={() => navigate('/paymentMethods')} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>{paymentMethodId ? 'Editar forma de pago' : 'Nueva forma de pago'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="card p-fluid">
                                <div className="field">
                                    <label htmlFor="name">Nombre</label>
                                    <InputText
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="description">Descripción</label>
                                    <InputTextarea
                                        id="description"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-content-end mt-2">
                                <div className="p-d-flex">
                                    <Button
                                        label="Volver"
                                        icon="pi pi-arrow-circle-left"
                                        className="p-button-raised p-button-secondary mr-2 mb-2"
                                        onClick={goBackPaymentMethodList}
                                    />
                                </div>
                                <div className="p-d-flex">
                                    <Button
                                        type="submit"
                                        label={paymentMethod ? 'Actualizar' : 'Guardar'}
                                        icon="pi pi-save"
                                        className="p-button-raised p-button-success"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PaymentMethodForm;
