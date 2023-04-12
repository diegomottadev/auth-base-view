import React from 'react';
// import '../layout/sass/_splash.scss'; // or `.scss` if you chose scss
import { ProgressBar } from 'primereact/progressbar';

export default function Loading(){
    return (
        <div style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
            <h3 style={{display: 'flex', justifyContent: 'center'}}><strong>Cargando</strong></h3>
            <h5 style={{display: 'flex', justifyContent: 'center'}}>No cierre esta página</h5>
            <ProgressBar mode="indeterminate" style={{ height: '6px', justifyContent: 'center' }}></ProgressBar>
        </div>
    );
}