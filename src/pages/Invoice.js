import React from 'react';
import { Button } from 'primereact/button';

const Invoice = () => {
    return (
        <>
            <Button label="Print" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px' }} />

            <div id="invoice-content">
                <div className="invoice-wrapper">
                    <div className="invoice-content">
                        <div className="invoice-header">
                            <div className="invoice-no">
                                <h1>Invoice</h1>
                                <h3>A/3100</h3>
                            </div>
                            <div className="invoice-logo">
                                <img src="assets/layout/images/extensions/prime-logo.svg" alt="babylon-layout" />
                                <p>9137 3rd Lane California City, CA 93504.</p>
                            </div>
                        </div>
                        <div className="invoice-table-1 bill-to">
                            <div className="invoice-table-header grid grid-nogutter">
                                <div className="col-6">
                                    <span>BILL TO</span>
                                </div>
                                <div className="col-3">
                                    <span>DATE</span>
                                </div>
                                <div className="col-3">
                                    <span>NOTES</span>
                                </div>
                            </div>
                            <div className="invoice-table-content">
                                <div className="invoice-table-row grid grid-nogutter">
                                    <div className="col-6">
                                        <span>TOYOKSU SYSCOM CORPORATION 11-27, MEIEKI 4-CHROME NAKAMURA-KU, NAGOYA 450-0002 JAPAN </span>
                                    </div>
                                    <div className="col-3">
                                        <span>30/08/19</span>
                                    </div>
                                    <div className="col-3">
                                        <span>N/A</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-table-1 items">
                            <div className="invoice-table-header grid grid-nogutter">
                                <div className="col-6">
                                    <span>DESCRIPTION</span>
                                </div>
                                <div className="col-2">
                                    <span>#</span>
                                </div>
                                <div className="col-2">
                                    <span>UNIT PRICE</span>
                                </div>
                                <div className="col-2">
                                    <span>LINE TOTAL</span>
                                </div>
                            </div>
                            <div className="invoice-table-content">
                                <div className="invoice-table-row grid grid-nogutter">
                                    <div className="col-6">
                                        <span>1 Year Elite Subscription</span>
                                    </div>
                                    <div className="col-2">
                                        <span>4</span>
                                    </div>
                                    <div className="col-2">
                                        <span>$99.00</span>
                                    </div>
                                    <div className="col-2">
                                        <span>$396.00</span>
                                    </div>
                                </div>
                                <div className="invoice-table-row grid grid-nogutter">
                                    <div className="col-6">
                                        <span>1 Year Elite Subscription</span>
                                    </div>
                                    <div className="col-2">
                                        <span>4</span>
                                    </div>
                                    <div className="col-2">
                                        <span>$99.00</span>
                                    </div>
                                    <div className="col-2">
                                        <span>$396.00</span>
                                    </div>
                                </div>
                                <div className="invoice-table-row grid grid-nogutter">
                                    <div className="col-6">
                                        <span>1 Year Elite Subscription</span>
                                    </div>
                                    <div className="col-2">
                                        <span>4</span>
                                    </div>
                                    <div className="col-2">
                                        <span>$99.00</span>
                                    </div>
                                    <div className="col-2">
                                        <span>$396.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-footer grid grid-nogutter">
                            <div className="col-12 md:col-6">
                                <div className="invoice-table-2 grid grid-nogutter">
                                    <div className="col-6">
                                        <div className="invoice-table-col header-col">
                                            <span>BANK</span>
                                            <span>ACCOUNT BENEFICIARY</span>
                                            <span>SWIFT</span>
                                            <span>IBAN</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="invoice-table-col content-col">
                                            <span>BestBank</span>
                                            <span>Edward Williams</span>
                                            <span>PJNWBXND</span>
                                            <input value="GB04420235692263866724650931" readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="invoice-table-2 summary grid grid-nogutter">
                                    <div className="col-6">
                                        <div className="invoice-table-col header-col">
                                            <span>SUB TOTAL</span>
                                            <span>VAT</span>
                                            <hr />
                                            <span className="total">TOTAL</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="invoice-table-col content-col">
                                            <span>$1304.00</span>
                                            <span>$234.72</span>
                                            <hr />
                                            <span className="total">$1538.72</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invoice;
