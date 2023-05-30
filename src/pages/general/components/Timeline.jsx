import { Button } from 'primereact/button';
import React from 'react';

const Timeline = ({movements,onLoadMoreMovents,loadingMoreMovements,onTotalMovements}) => {



    return (

        <div className="col-12 xl:col-12">
         {movements && movements.length > 0  && 

        <div className="card card-w-title timeline">
            <ul>
                {movements && 
                    movements.map((movement, index) => {
                        return (
                            <li key={movement.id}>
                                <div className="activity-link"></div>
                                {/* <div className="timeline-icon">
                                    <i className="pi pi-globe"></i>
                                </div> */}
                                <div className="timeline-content">
                                    <h5>$ {movement.amount}</h5>
                                    <h3>{movement?.clasification?.name}</h3>

                                    <p>{movement?.subclasification?.name}</p>
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
             {movements.length  !== onTotalMovements &&
              <div className='flex align-items-center justify-content-center '>
               <Button label='Cargar mas' className="mr-2 mb-2" icon="pi pi-plus" loading={loadingMoreMovements} onClick={onLoadMoreMovents} />
              </div>
            }
        </div>
         }
    </div>
    
    );
}
export default Timeline;
