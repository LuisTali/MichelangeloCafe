import React, { useEffect } from "react";
import './Modal.css';

export const Modal = ({setIsOpen,state,message,setAnswer}) =>{

    useEffect(()=>{
        if(state < 3){
            const timeoutId = setTimeout(()=>{
                setIsOpen(false);
            },2000);
            return () => clearTimeout(timeoutId); //Limpia el timeout para que si se abre un Modal distinto, 
            //el timeout anterior no se siga aplicando y lo cierre automaticamente.
        }else{
            
        }
    },[state])

    const handleAnswerClick = (option) =>{
        setAnswer(option);
        setIsOpen(false);
    }

    if(state == 3){
        return <div className='confirmModal'>
            <label>{message}</label>
            <div className="options">
                <button onClick={()=>handleAnswerClick('yes')}>SI</button>
                <button onClick={()=>handleAnswerClick('no')}>NO</button>
            </div>
        </div>
    }

    return <div className={state == 1 ? 'modal success' : 'modal failure'}>
        <label>{message}</label>
    </div>

}