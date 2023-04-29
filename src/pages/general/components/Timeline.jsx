import React, { useEffect, useState } from 'react';

const Timeline = ({movements}) => {


   



    return (

        <div className="col-12 xl:col-12">
        <div className="card card-w-title timeline">
            <h5>Movimientos de Mes </h5>
            <ul>
                {movements && 
                    movements.map((movement, index) => {
                        return (
                            <li key={movement.id}>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-globe"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>$ {movement.amount}</h5>
                                    <h3>{movement.clasification.name}</h3>

                                    <p>{movement.description}</p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>{movement.lastDate}</span>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    </div>
    
    );
}
export default Timeline;
