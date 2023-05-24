import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovementService from '../../../services/movements/MovementService';
import './TagGeneral.css'

const TagGeneral = ({onDateCurrent,onDateFormatInit, onDateFormatEnd, onMonth, balance, totalIncomes, totalExpenses, incomes, expenses, savings, cards,dollars }) => {   
    
    const navigate = useNavigate();


    let formattedDateInit = null
    let formattedDateEnd = null
    let formattedDateCurrent = null
    let dateMonthLabel = onMonth ??  new Date();  // 2009-11-10
    let monthLabel = dateMonthLabel.toLocaleString('default', { month: 'long' });
    
    const [showError, setShowError] = useState(false);
    const [dolarOficial, setDolarOficial] = useState(null)
    const [dolarBlue, setDolarBlue] = useState(null)

    if(onDateCurrent){
                // Obtenemos los componentes de fecha y hora del objeto Date
                const yearInit = onDateCurrent.getFullYear();
                const monthInit = (onDateCurrent.getMonth() + 1).toString().padStart(2, '0');
                const dayInit = onDateCurrent.getDate().toString().padStart(2, '0');
                // Formateamos los componentes en la cadena de fecha y hora deseada
                formattedDateCurrent = `${dayInit}-${monthInit}-${yearInit}`;
    }


    if (onDateFormatInit && onDateFormatEnd) {

        // Obtenemos los componentes de fecha y hora del objeto Date
        const yearInit = onDateFormatInit.getFullYear();
        const monthInit = (onDateFormatInit.getMonth() + 1).toString().padStart(2, '0');
        const dayInit = onDateFormatInit.getDate().toString().padStart(2, '0');

        // Formateamos los componentes en la cadena de fecha y hora deseada
        formattedDateInit = `${dayInit}-${monthInit}-${yearInit}`;


        const yearEnd = onDateFormatEnd.getFullYear();
        const monthEnd = (onDateFormatEnd.getMonth() + 1).toString().padStart(2, '0');
        const dayEnd = onDateFormatEnd.getDate().toString().padStart(2, '0');

        // Formateamos los componentes en la cadena de fecha y hora deseada
        formattedDateEnd = `${dayEnd}-${monthEnd}-${yearEnd}`;
    }


    useEffect(() => {
        async function loadLazyData() {

            try {

                const { data: { blue, oficial } } = await MovementService.getDolar()
                setDolarBlue(blue)
                setDolarOficial(oficial)

                // });
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la obtención de los valores del dolar');
                setShowError(true);

            }

        }
        loadLazyData();
    }, [])


    const onMovementByClasificationNew = (clasificationId) => {
        navigate(`/movements/${clasificationId}/clasification/new`);
    }

    return (

        <div className="col-12">
            {/* <div className="card">
            <h3 className='text-center'>Detalle anual {monthLabel} </h3>
                <div className="grid">

                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box views">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Balance</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {balance || "0.00" }</div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box sales">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Ingresos totales</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {totalIncomes || "0.00" } </div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box users">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Gastos totales</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {totalExpenses || "0.00" }</div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box checkin">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Dolar U$D </span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers" >Blue {dolarBlue?.value_buy} | {dolarBlue?.value_sell}</div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="card">
                {
                    formattedDateEnd && formattedDateInit &&              
                    <h3 className='text-center'>Detalle desde {formattedDateInit} hasta {formattedDateEnd} </h3>  
                }
                {    
                    formattedDateCurrent && <h3 className='text-center'>Detalle del {formattedDateCurrent} </h3>
                }
                {(!formattedDateEnd && !formattedDateInit) && !formattedDateCurrent && 
                
                <h3 className='text-center'>Detalle mensual de {monthLabel} </h3>
                
                }

                <div className="grid">
                <div className="col-12 lg:col-6 xl:col-4">
                        <div className="overview-box views">
                            <span className="overview-title"><i className="pi pi-chart-bar" style={{ fontSize: '1.5rem' }}></i> Balance</span>
                            <div className="overview-numbers">$ {balance || "0.00" }</div>
                            {/* <div className="overview-subinfo">21% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <div className="overview-box dollar ">
                            <Button onClick={() =>onMovementByClasificationNew(5)} style={{'background': '#ffffff', 'color':'#0daf15','borderColor':'#0daf15'}} tooltip="Ingresar dolares" tooltipOptions={{ position: 'top' }} icon="pi pi-plus" className="overview-icon p-button-rounded mr-2 mb-2" />
                            <span className="overview-title"><i className="pi pi-dollar" style={{ fontSize: '1.5rem' }}></i> Dolares</span>
                            <div className="overview-numbers">$ {dollars || "0.00" }</div>
                            {/* <div className="overview-subinfo">7% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <div className="overview-box checkin ">
                            <Button onClick={() =>onMovementByClasificationNew(3)} style={{'background': '#ffffff', 'color':'#66BB6A','borderColor':'#66BB6A'}} tooltip="Ingresar ahorros" tooltipOptions={{ position: 'top' }} icon="pi pi-plus" className="overview-icon p-button-rounded mr-2 mb-2" />
                            <span className="overview-title"><i className="pi pi-server" style={{ fontSize: '1.5rem' }}></i> Ahorros</span>
                            <div className="overview-numbers">$ {savings || "0.00" }</div>
                            {/* <div className="overview-subinfo">7% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <div className="overview-box sales">
                            <Button onClick={() =>onMovementByClasificationNew(1)} style={{'background': '#ffffff', 'color':'#42A5F5','borderColor':'#42A5F5'}} tooltip="Ingresar ingresos" tooltipOptions={{ position: 'top' }} icon="pi pi-plus" className="overview-icon p-button-rounded mr-2 mb-2"  />
                            <span className="overview-title"><i className="pi pi-sort-amount-up " style={{ fontSize: '1.5rem' }}></i> Ingresos</span>
                            <div className="overview-numbers">$ {incomes || "0.00" }</div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <div className="overview-box users ">
                            <Button onClick={() =>onMovementByClasificationNew(2)} style={{'background': '#ffffff', 'color':'#FFB300','borderColor':'#FFB300'}} tooltip="Ingresar gastos " tooltipOptions={{ position: 'top' }} icon="pi pi-plus" className="overview-icon p-button-rounded mr-2 mb-2" />
                            <span className="overview-title"><i className="pi pi-sort-amount-down" style={{ fontSize: '1.5rem' }}></i> Gastos</span>
                            <div className="overview-numbers">$ {expenses || "0.00" }</div>
                        </div>
                    </div>
                   
                    <div className="col-12 lg:col-6 xl:col-4">
                        <div className="overview-box views" style={{ 'backgroundColor': '#d32f2f' }}>
                            <Button onClick={() =>onMovementByClasificationNew(4)} style={{'background': '#ffffff', 'color':'rgb(211, 47, 47)'}} icon="pi pi-plus" tooltip="Ingresar tarjetas " tooltipOptions={{ position: 'top' }} className="overview-icon p-button-rounded mr-2 mb-2" />
                            <span className="overview-title"><i className="pi pi-credit-card" style={{ fontSize: '1.5rem' }}></i> Tarjetas</span>
                            <div className="overview-numbers">$ {cards || "0.00" }</div>
                            {/* <div className="overview-subinfo">18% more than yesterday</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TagGeneral;
