import React, { useEffect, useState } from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import MovementService from '../../services/movements/MovementService';
import TagGeneral from './components/TagGeneral';
import Timeline from './components/Timeline';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';


const General = () => {


    const [showError, setShowError] = useState(false);

    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [movements, setMovements] = useState(null);

    const [cards, setCards] = useState(null);
    const [savings, setSavings] = useState(null);
    const [totalIncomes, setTotalIncomes] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [balance, setBalance] = useState(null);



    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    const [dateCurrent, setDateCurrent] = useState(new Date());
    const [dateCurrentIsActive, setDateCurrentIsActive] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [monthIsActive, setMonthIsActive] = useState(false);
    const [dateInit, setDateInit] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(() => {
        const d = new Date(dateInit);
        d.setDate(d.getDate() + 30);
        return d;
    });

    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {
                if(dateCurrentIsActive){

                    const currentDate = new Date();

                    // Obtenemos los componentes de fecha y hora del objeto Date
                    const year = currentDate.getFullYear();
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = currentDate.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDate = `${year}-${month}-${day} 00:00:00`;

                     params = {
                        dateCurrent: formattedDate,
                    }
                }

                const { data: { data: { movements, transformedResults: { general } } } } = await MovementService.allBillsIncomesTotalPerMonth(params)
                
                setIncomes(general.incomes)
                setExpenses(general.expenses)
                setCards(general.cards)
                setSavings(general.savings)
                setTotalIncomes(general.total_incomes)
                setTotalExpenses(general.total_bills)
                setBalance(general.balance)
                setMovements(movements)
                setDateCurrentIsActive(false)
                // });
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);

            }

        }

        if (!dateCurrentIsActive) return 

        loadLazyData();

    }, [dateCurrentIsActive])

    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {
                if(dateCurrentIsActive){

                    const currentDate = new Date();

                    // Obtenemos los componentes de fecha y hora del objeto Date
                    const year = currentDate.getFullYear();
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = currentDate.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDate = `${year}-${month}-${day} 00:00:00`;

                     params = {
                        dateCurrent: formattedDate,
                    }
                }

                if(monthIsActive){
                    params = {
                       month: month,
                   }
               }

                const { data: { data: { movements, transformedResults: { general } } } } = await MovementService.allBillsIncomesTotalPerMonth(params)
                
                setIncomes(general.incomes)
                setExpenses(general.expenses)
                setCards(general.cards)
                setSavings(general.savings)
                setTotalIncomes(general.total_incomes)
                setTotalExpenses(general.total_bills)
                setBalance(general.balance)
                setMovements(movements)
                setDateCurrentIsActive(false)
                // });
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);

            }

        }

        loadLazyData();

    }, [])
    
    const onHandleDateCurrent = () => {        
        setDateCurrentIsActive(true)
    }


    const onHandleMonth = (e) => {        
        setMonthIsActive(true)
        setMonth(e.value)
    }
    
    return (
        <div >
            <AppBreadcrumb meta={'General'} />
            <div className="layout-dashboard">
                <div className="col-12">

                    <div className="card">
                        <div className="grid">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-3" >
                                    <label htmlFor="firstname2">Fecha actual</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Calendar value={dateCurrent} onChange={(e) => setDateCurrent(e.value)} dateFormat="dd/mm/yy" disabled locale="es" style={{ marginRight: '10px' }} />
                                        <Button icon="pi pi-check" onClick={()=>onHandleDateCurrent()} />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-3">
                                    <label htmlFor="firstname2">Mes</label>
                                    <Calendar value={month} onChange={(e) => onHandleMonth(e)} view="month" dateFormat="mm/yy" showIcon locale="es" />
                                </div>

                                <div className="field col-12 md:col-3">

                                    <label htmlFor="firstname2">Desde</label>
                                    <Calendar value={dateInit} onChange={(e) => setDateInit(e.value)} dateFormat="dd/mm/yy" showIcon locale="es" />
                                </div>
                                <div className="field col-12 md:col-3">
                                    <label htmlFor="lastname2">Hasta</label>
                                    <Calendar value={dateEnd} onChange={(e) => setDateEnd(e.value)} dateFormat="dd/mm/yy" showIcon locale="es" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TagGeneral balance={balance} totalIncomes={totalIncomes} totalExpenses={totalExpenses} incomes={incomes} expenses={expenses} savings={savings} cards={cards} />
                <Timeline movements={movements} />
            </div>
        </div>

    );
}
export default General;
