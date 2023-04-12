

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import WayPayService from '../../../services/waypayes/WayPayService';

export const WayPayForm = () => {
    const toast = useRef();
    const navigate = useNavigate();
    const { wayPayId } = useParams();

    const [wayPay, setWayPay] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchWayPay = async () => {
          try {
            const {data:response} = await WayPayService.getWayPay(wayPayId);
            setWayPay(response.data);
            setName(response.data.name);
            setDescription(response.data.description || '');
          } catch (error) {
            console.error(error);
          }
        };
    
        if (wayPayId) {
          fetchWayPay();
        }
      }, [wayPayId]);


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
            if (wayPay) {
                response = await WayPayService.updateWayPay(wayPay.id, data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Forma de pago ${name} actualizada`,
                    life: 3000,
                });
            } else {
                response = await WayPayService.createWayPay(data);
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

    return (
        <div>
            {wayPayId ?
            <AppBreadcrumb meta={'Formas de pagos / Editar'} /> : <AppBreadcrumb meta={'Formas de pagos / Nuevo'} />}
            <div className="layout-content">

            <Toast ref={toast} onHide={() => navigate('/waypayes')} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>{wayPayId ? 'Editar forma de pago' : 'Nueva forma de pago'}</h5>
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
                                        label="Cancelar"
                                        className="p-button-raised p-button-warning mr-2 mb-2"
                                    />
                                </div>
                                <div className="p-d-flex">
                                    <Button
                                        type="submit"
                                        label={wayPay ? 'Actualizar' : 'Guardar'}
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

export default WayPayForm;
