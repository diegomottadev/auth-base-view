import React, {  useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';
export default function Error({mensaje}){

    const msgs = useRef(null);     
    
    useEffect(() => {
        if(mensaje){
            msgs.current.show([
                 { severity: 'error', summary:  mensaje, sticky:true,closable:false }
             ]);
        }
    }, []); //
    
    
    if(!mensaje){
        return <div></div>;
    }

    return (

        
        <div>
            <Messages ref={msgs} /> 
        </div>
    )

}