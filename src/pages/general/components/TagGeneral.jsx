import React, { useEffect, useState } from 'react';
import MovementService from '../../../services/movements/MovementService';

const TagGeneral = () => {


    const [showError, setShowError] = useState(false);

    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [cards, setCards] = useState(null);
    const [savings, setSavings] = useState(null);
    const [totalIncomes, setTotalIncomes] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [balance, setBalance] = useState(null);

    const [dolarBlue, setDolarBlue] = useState(null)
    const [dolarOficial, setDolarOficial] = useState(null)

    useEffect(() => {
        async  function loadLazyData () {

            try {
                
                const {data:{blue,oficial}} =  await MovementService.getDolar()
                setDolarBlue(blue)
                setDolarOficial(oficial)
                const {data:{data:{transformedResults:{general}}}} =  await MovementService.allBillsIncomesTotalPerMonth()
                console.log(general)
                setIncomes(general.incomes)
                setExpenses(general.expenses)
                setCards(general.cards)
                setSavings(general.savings)
                setTotalIncomes(general.total_incomes)
                setTotalExpenses(general.total_bills)
                setBalance(general.balance)
               // });
            } catch (err){
                console.log(err);
                console.warn('Hubo un problema con la carga de estadisticas generales');
                setShowError(true);
                
            }
            
        }
        loadLazyData();
    },[]) 



    return (

        <div className="col-12">
            <div className="card">
                <div className="grid">
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box views">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Balance</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {balance}</div>
                            {/* <div className="overview-subinfo">21% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box sales">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Ingresos totales</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {totalIncomes}</div>
                            {/* <div className="overview-subinfo">21% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box users">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Gastos totales</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {totalExpenses}</div>
                            {/* <div className="overview-subinfo">21% more than yesterday</div> */}
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
            </div>
            <div className="card">
                <div className="grid">

                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box sales">
                            <i className="overview-icon pi pi-money-bill"></i>
                            <span className="overview-title">Ingresos</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {incomes}</div>
                            {/* <div className="overview-subinfo">21% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box users ">
                            <i className="overview-icon pi pi-sort-amount-down"></i>
                            <span className="overview-title">Gastos</span>
                            <i className="overview-arrow pi pi-chevron-circle-down"></i>
                            <div className="overview-numbers">$ {expenses}</div>
                            {/* <div className="overview-subinfo">2% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box checkin ">
                            <i className="overview-icon pi pi-dollar"></i>
                            <span className="overview-title">Ahorros</span>
                            <i className="overview-arrow pi pi-chevron-circle-up"></i>
                            <div className="overview-numbers">$ {savings}</div>
                            {/* <div className="overview-subinfo">7% more than yesterday</div> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="overview-box views" style={{'backgroundColor':'#d32f2f'}}>
                            <i className="overview-icon pi pi-credit-card"></i>
                            <span className="overview-title">Tarjetas</span>
                            <i className="overview-arrow pi pi-chevron-circle-down"></i>
                            <div className="overview-numbers">$ {cards}</div>
                            {/* <div className="overview-subinfo">18% more than yesterday</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TagGeneral;
