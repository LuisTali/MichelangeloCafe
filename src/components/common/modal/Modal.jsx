import React, { useEffect } from "react";
import './Modal.css';

export const Modal = ({setIsOpen,state,message,setAnswer,client,setClient}) =>{

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
        console.log(option);
        if(state == 4){
            if(option != 'no'){
                if(client.name == undefined || client.phone == undefined){
                    console.log('llene los datos');
                }else{
                    if(client.name.length < 4 || client.phone.length < 8){
                        let inputs = document.getElementsByTagName("input");
                        for(const input of inputs){
                            console.log(input.value);
                            console.log(input.name);
                            if(input.name == 'name' && input.value.length < 4){
                                input.style.border = "3px solid red";
                                setTimeout(()=>input.style.border = "none",3000)
                                //insert After para que aparezca abajo mensaje indicando que no tiene el largo suficiente
                            }
                            if(input.name == 'phone' && input.value.length < 8){
                                input.style.border = "3px solid red"
                                setTimeout(()=>input.style.border = "none",3000)
                                //insert After para que aparezca abajo mensaje indicando que no tiene el largo suficiente
                            }
                            //setear input en rojo modificando el estilo
                        }
                    }
                    //setAnswer(option);
                    //setIsOpen(false);
                }
            }else{
                setAnswer(option);
                setIsOpen(false);
            } 
        }else{
            setAnswer(option);
            setIsOpen(false);
        }
    }

    if(state == 4){
        return <div className='chargeModal'>
            <label>{message}</label>
            <div className="inputGroup">
                <label>Nombre:</label>
                <input name="name" id="clientPhone" className="inputClient" onChange={(e)=>setClient({...client,[e.target.name]:e.target.value})}></input>
            </div>
            <div className="inputGroup">
                <label>Telefono:</label>
                <input name="phone" id="clientName" className="inputClient" onChange={(e)=>setClient({...client,[e.target.name]:e.target.value})}></input>
            </div>
            <div className="options">
                <button onClick={()=>handleAnswerClick('yes')}>SI</button>
                <button onClick={()=>handleAnswerClick('no')}>NO</button>
            </div>
        </div>
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