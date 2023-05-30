import React, { useEffect, useState } from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import MovementService from '../../services/movements/MovementService';
import TagGeneral from './components/TagGeneral';
import Timeline from './components/Timeline';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Chart } from 'primereact/chart';
import { Message } from 'primereact/message';

const General = () => {

    const yearEnd = (new Date()).getFullYear()
    const monthEnd = ((new Date()).getMonth() + 1).toString().padStart(2, '0');
    const formattedDateMonth = `${monthEnd}/${yearEnd}`;

    const yearCurrentInit = (new Date()).getFullYear();
    const monthCurrentInit = ((new Date()).getMonth() + 1).toString().padStart(2, '0');
    const dayCurrentInit = (new Date()).getDate().toString().padStart(2, '0');
    const formattedDateCurrent = `${dayCurrentInit}/${monthCurrentInit}/${yearCurrentInit}`;
    const [showError, setShowError] = useState(false);
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [movements, setMovements] = useState(null);
    const [cards, setCards] = useState(null);
    const [savings, setSavings] = useState(null);
    const [dollars, setDollars] = useState(null);
    const [totalIncomes, setTotalIncomes] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loadingMoreMovements, setLoadingMoreMovement] = useState(false);
    const [totalMovements, setTotalMovements] = useState(false);
    const [percentageSpent, setPercentageSpent] = useState(false);
    const [percentageNotSpent, setPercentageNotSpent] = useState(false);
    const [percentageSaving, setPercentageSaving] = useState(false);
    const [percentageCard, setPercentageCard] = useState(false);

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

    const [dateCurrent, setDateCurrent] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [month, setMonth] = useState(new Date());
    const [dateInit, setDateInit] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [lineData, setLineData] = useState(null);

    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {
                const { data: { data } } = await MovementService.allBillsIncomesTotalPerYear(params)
                const months = data.recordMonths.map(record => record.month);
                const totalIncomesMonth = data.recordMonths.map(record => parseFloat(record.incomes));
                const totalExpensesMonth = data.recordMonths.map(record => parseFloat(record.expenses));
                const totalSavingsMonth = data.recordMonths.map(record => parseFloat(record.savings));
                const totalCardsMonth = data.recordMonths.map(record => parseFloat(record.cards));

                // Actualizar la constante `lineData` con los nuevos datos
                setLineData({
                    labels: [...months],
                    datasets: [
                        {
                            label: 'Ingresos',
                            data: [0, ...totalIncomesMonth],
                            fill: false,
                            borderColor: '#42A5F5',
                            tension: 0.4
                        },
                        {
                            label: 'Gastos',
                            data: [0, ...totalExpensesMonth],
                            fill: false,
                            borderColor: '#FFB300',
                            tension: 0.4
                        },
                        {
                            label: 'Ahorros',
                            data: [0, ...totalSavingsMonth],
                            fill: false,
                            borderColor: '#66BB6A',
                            tension: 0.4
                        },
                        {
                            label: 'Tarjetas',
                            data: [0, ...totalCardsMonth],
                            fill: false,
                            borderColor: 'rgb(211, 47, 47)',
                            tension: 0.4
                        }
                    ]
                });


                // });
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de las estadisticas anuales');
                setShowError(true);

            }
        }

        loadLazyData()

    }, [])

    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {
                if (month) {
                    const date = new Date(month);
                    const monthCharnged = date.getMonth() + 1
                    params.month = monthCharnged
                }

                const { data: { data: { movements, totalMovements, transformedResults: { general } } } } = await MovementService.allBillsIncomesTotalPerMonth(params)

                setIncomes(general?.incomes || null)
                setExpenses(general?.expenses || null)
                setCards(general?.cards || null)
                setSavings(general?.savings || null)
                setDollars(general?.dollars || null)
                setTotalIncomes(general?.total_incomes || null)
                setTotalExpenses(general?.total_bills || null)
                setBalance(general?.balance || null)
                setMovements(movements ?? null)
                setTotalMovements(totalMovements)
                setPercentageSpent(general?.percentage_spent)
                setPercentageNotSpent(general?.percentage_not_spent)
                setPercentageSaving(general?.percentage_savings)
                setPercentageCard(general?.percentage_cards)
                setDoughnutData({
                    labels: ['Ingresos', 'Gastos', 'Ahorros','Tarjetas'],
                    datasets: [
                        {
                            data: [general?.percentage_not_spent, general?.percentage_spent, general?.percentage_savings,general?.percentage_cards],
                            backgroundColor: ['#42A5F5', '#FFB300', '#66BB6A','rgb(211, 47, 47)'],
                            hoverBackgroundColor: ['#42a5f5e0', '#ffb300e6', '#66bb6ae6','#d32f2fe3']
                        }
                    ]
                })
                // });
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);

            }

        }
        if (month) loadLazyData();



    }, [month])

    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {
                if (dateInit && dateEnd) {

                    // Obtenemos los componentes de fecha y hora del objeto Date
                    const yearInit = dateInit.getFullYear();
                    const monthInit = (dateInit.getMonth() + 1).toString().padStart(2, '0');
                    const dayInit = dateInit.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDateInit = `${yearInit}-${monthInit}-${dayInit} 00:00:00`;

                    params.dateInit = formattedDateInit

                    const yearEnd = dateEnd.getFullYear();
                    const monthEnd = (dateEnd.getMonth() + 1).toString().padStart(2, '0');
                    const dayEnd = dateEnd.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd} 00:00:00`;

                    params.dateEnd = formattedDateEnd
                }

                const { data: { data: { movements, transformedResults: { general } } } } = await MovementService.allBillsIncomesTotalPerMonth(params)
                setIncomes(general?.incomes || null)
                setExpenses(general?.expenses || null)
                setCards(general?.cards || null)
                setSavings(general?.savings || null)
                setDollars(general?.dollars || null)
                setTotalIncomes(general?.total_incomes || null)
                setTotalExpenses(general?.total_bills || null)
                setBalance(general?.balance || null)
                setMovements(movements ?? null)
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);

            }

        }

        loadLazyData();

    }, [dateInit, dateEnd])

    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {
                if (dateCurrent) {

                    // Obtenemos los componentes de fecha y hora del objeto Date
                    const year = dateCurrent.getFullYear();
                    const month = (dateCurrent.getMonth() + 1).toString().padStart(2, '0');
                    const day = dateCurrent.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDate = `${year}-${month}-${day} 00:00:00`;

                    params.dateCurrent = formattedDate

                }

                const { data: { data: { movements, transformedResults: { general } } } } = await MovementService.allBillsIncomesTotalPerMonth(params)
                setIncomes(general?.incomes || null)
                setExpenses(general?.expenses || null)
                setCards(general?.cards || null)
                setSavings(general?.savings || null)
                setDollars(general?.dollars || null)
                setTotalIncomes(general?.total_incomes || null)
                setTotalExpenses(general?.total_bills || null)
                setBalance(general?.balance || null)
                setMovements(movements ?? null)
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);
            }
        }

        if (dateCurrent) loadLazyData();

    }, [dateCurrent])


    useEffect(() => {
        async function loadLazyData() {
            let params = {}
            try {

                if (dateCurrent) {

                    // Obtenemos los componentes de fecha y hora del objeto Date
                    const year = dateCurrent.getFullYear();
                    const month = (dateCurrent.getMonth() + 1).toString().padStart(2, '0');
                    const day = dateCurrent.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDate = `${year}-${month}-${day} 00:00:00`;

                    params.dateCurrent = formattedDate

                }

                if (month) {
                    const date = new Date(month);
                    const monthCharnged = date.getMonth() + 1
                    params.month = monthCharnged
                }

                if (dateInit && dateEnd) {

                    // Obtenemos los componentes de fecha y hora del objeto Date
                    const yearInit = dateInit.getFullYear();
                    const monthInit = (dateInit.getMonth() + 1).toString().padStart(2, '0');
                    const dayInit = dateInit.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDateInit = `${yearInit}-${monthInit}-${dayInit} 00:00:00`;

                    params.dateInit = formattedDateInit

                    const yearEnd = dateEnd.getFullYear();
                    const monthEnd = (dateEnd.getMonth() + 1).toString().padStart(2, '0');
                    const dayEnd = dateEnd.getDate().toString().padStart(2, '0');

                    // Formateamos los componentes en la cadena de fecha y hora deseada
                    const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd} 00:00:00`;

                    params.dateEnd = formattedDateEnd

                }
                params.pageSize = pageSize
                setLoadingMoreMovement(true)
                const { data: { data: { movements, transformedResults: { general } } } } = await MovementService.allBillsIncomesTotalPerMonth(params)
                setIncomes(general?.incomes || null)
                setExpenses(general?.expenses || null)
                setCards(general?.cards || null)
                setSavings(general?.savings || null)
                setTotalIncomes(general?.total_incomes || null)
                setTotalExpenses(general?.total_bills || null)
                setBalance(general?.balance || null)
                setMovements(movements ?? null)
                setLoadingMoreMovement(false)
                // });
            } catch (err) {
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);

            }

        }

        if (pageSize >= 20) loadLazyData();

    }, [pageSize])


    const onLoadMoreMovents = () => {
        setPageSize(pageSize + 10)
    }

    let dateMonthLabel = month ??  new Date();  // 2009-11-10
    let monthLabel = dateMonthLabel.toLocaleString('default', { month: 'long' });



    const dataset = doughnutData?.datasets[0]; // Obtén el primer dataset (índice 0)
    const hasNullValues = dataset?.data.some(value => value === null);

    return (
        <div >
            <AppBreadcrumb meta={'General'} />
            <div className="layout-dashboard">
                <div className="col-12 m-t-0">
                    <div className="card mb-0">
                        <div className="p-fluid formgrid grid">
                            <div className="col-12 lg:col-6 xl:col-3" >
                                <span className="overview-title">Fecha</span>
                                <Calendar value={dateCurrent} onChange={(e) => {
                                    setDateCurrent(e.value)
                                    setMonth(null)
                                    setDateEnd(null)
                                    setDateInit(null)
                                }} dateFormat="dd/mm/yy" showIcon locale="es" placeholder={formattedDateCurrent} />
                            </div>
                            <div className="col-12 lg:col-6 xl:col-3">
                                <span className="overview-title">Mes</span>
                                <Calendar value={month} onChange={(e) => {
                                    setMonth(e.value)
                                    setDateCurrent(null)
                                    setDateEnd(null)
                                    setDateInit(null)
                                }}
                                    view="month" dateFormat="mm/yy" showIcon locale="es" placeholder={formattedDateMonth} />
                            </div>

                            <div className="col-12 lg:col-6 xl:col-3">

                                <span className="overview-title">Desde</span>
                                <Calendar value={dateInit} onChange={(e) => {
                                    setDateInit(e.value)
                                    setMonth(null)
                                    setDateCurrent(null)
                                }} dateFormat="dd/mm/yy" showIcon locale="es" placeholder='dd/mm/yy' />
                            </div>
                            <div className="col-12 lg:col-6 xl:col-3">
                                <span className="overview-title">Hasta</span>
                                <Calendar value={dateEnd} onChange={(e) => {
                                    setDateEnd(e.value)
                                    setMonth(null)
                                    setDateCurrent(null)
                                }
                                } dateFormat="dd/mm/yy" showIcon locale="es" placeholder='dd/mm/yy' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 m-t-0">
                    <div className="card mb-0">
                        <div className="p-fluid formgrid grid">

                            <div className="col-12 lg:col-6 xl:col-6">
                                <h5 className="centerText">Resumen anual</h5>
                                <Chart type="line" data={lineData} />
                            </div>

                            <div className="col-12 lg:col-6 xl:col-6">
                                
                                <h5 className='centerText'>Resumen mensual de {monthLabel} en % </h5>
                                
                                <div className="flex justify-content-center">
                                    {!hasNullValues &&
                                    <Chart style={{ position: 'relative', width: '50%' }} type="doughnut" data={doughnutData} />
                                    }
                                    {hasNullValues &&
                                       <Message severity="info" text="No es posible mostrar resumen mensual en % en este momento" />
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TagGeneral onDateCurrent={dateCurrent} onDateFormatInit={dateInit} onDateFormatEnd={dateEnd} onMonth={month} balance={balance} totalIncomes={totalIncomes} totalExpenses={totalExpenses} incomes={incomes} expenses={expenses} savings={savings} cards={cards} dollars={dollars} />
                <Timeline movements={movements} onLoadMoreMovents={onLoadMoreMovents} loadingMoreMovements={loadingMoreMovements} onTotalMovements={totalMovements} />
            </div>
        </div>

    );
}
export default General;
