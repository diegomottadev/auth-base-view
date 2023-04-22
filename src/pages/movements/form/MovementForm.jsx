

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import CaterogyService from '../../../services/categories/CaterogyService';
import MovementService from '../../../services/movements/MovementService';
import PaymentMethodService from '../../../services/PaymentMethods/PaymentMethodService';
import TypeBillService from '../../../services/typeBills/TypeBillService';

export const MovementForm = () => {
    const toast = useRef();
    const navigate = useNavigate();
    const { movementId } = useParams();


    const [typeBills, setTypeBills] = useState(null)
    const [categories, setCategories] = useState(null)
    const [methodPayments, setMethodPayments] = useState(null)

    const [movement, setMovement] = useState(null);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [typebill, setTypeBill] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchMovement = async () => {
          try {
            const {data:response} = await MovementService.getPaymentMethod(movementId);
            setMovement(response.data);
            setAmount(response.data.amount);
            setTypeBill(response.data.typebill_id);
            setPaymentMethod(response.data.waypay_id);
            setCategory(response.data.category_id);
        } catch (error) {
            console.error(error);
          }
        };
    
        if (movementId) {
          fetchMovement();
        }
      }, [movementId]);


      useEffect(() => {
        const fetchTypeBills = async () => {
          try {
            const {data:response} = await TypeBillService.allTypeBills();
            setTypeBills(response.data);
           
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchTypeBills();
        
      }, []);



      // useEffect(() => {
      //   const fetchMethodPayments = async () => {
      //     try {
      //       const {data:response} = await PaymentMethodService.allPaymentMethods();
      //       setMethodPayments(response.data);
           
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   };
    
      //   fetchMethodPayments();
        
      // }, []);

      // useEffect(() => {
      //   const fetchCategories = async () => {
      //     try {
      //       const {data:response} = await CaterogyService.allCategories();
      //       setCategories(response.data);
           
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   };
    
      //   fetchCategories();
        
      // }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!amount && !paymentMethod && category) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }

        const body = {
            amount,
            description,
            category,
            paymentMethod,
            typebill,
        };

        try {
            let response;
            if (movement) {
                response = await MovementService.updatePaymentMethod(movement.id, body);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Movimiento actualizado`,
                    life: 3000,
                });
            } else {
                response = await MovementService.createPaymentMethod(body);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Movimiento creado`,
                    life: 3000,
                });
            }

        } catch (error) {
            console.error(error);
        }
    };

    const goBackPaymentMethodList = () => {
        navigate('/movements');
      };

    return (
        <div>
            {movementId ?
            <AppBreadcrumb meta={'Movimientos / Editar'} /> : <AppBreadcrumb meta={'Movimientos / Nuevo'} />}
            <div className="layout-content">

            <Toast ref={toast} onHide={() => navigate('/movements')} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                    {/* user_id: user_id,
                    category_id: bill.category_id,
                    waypay_id: bill.waypay_id,
                    typebill_id: bill.typebill_id,
                    amount: bill.amount,
                    description: bill.description,
                    lastDate: new Date(), */}
                        <h5>{movementId ? 'Editar movimiento' : 'Nuevo movimiento'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="card p-fluid">
                                <div className="field">
                                    <label htmlFor="name">Monto</label>
                                    <InputText
                                        id="name"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
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
                                <div className='field'>
                                    <label htmlFor="typeBill">Tipo de movimiento</label>
                                    <Dropdown value={typebill} onChange={(e) => setTypeBill(e.value)} options={typeBills} optionLabel="name" placeholder="-- Seleccionar tipo de movimiento --" />
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
                                        label={movement ? 'Actualizar' : 'Guardar'}
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

export default MovementForm;
