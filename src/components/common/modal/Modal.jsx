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
                            if(input.name == 'name' && input.value.length < 4){
                                let warning = document.createElement("span");
                                warning.innerHTML = "Ingrese un nombre valido";
                                let divInput = document.getElementById("inputGroupName")
                                warning.setAttribute("id","warning1");
                                input.style.border = "3px solid red";
                                divInput.appendChild(warning);
                                setTimeout(()=>{
                                    input.style.border = "none"
                                    warning.remove();
                                },3000)
                                //insert After para que aparezca abajo mensaje indicando que no tiene el largo suficiente
                            }
                            if(input.name == 'phone' && input.value.length < 8){
                                let warning = document.createElement("span"); //Crea Aviso
                                warning.innerHTML = "Ingrese un telefono valido"; //Setea texto aviso
                                let divInput = document.getElementById("inputGroupPhone") //Obtiene div del input
                                warning.setAttribute("id","warning2"); //Setea id para luego removerlo
                                input.style.border = "3px solid red"; //Borde del input incorrecto seteado a rojo
                                divInput.appendChild(warning); //Agrega el aviso debajo del input
                                //input.after(warning,"Fill the phone of the client");
                                setTimeout(()=>{ //Remueve estados alterados luego de avisar error en los datos
                                    input.style.border = "none";
                                    warning.remove();
                                },3000)
                            }
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
            <div className="inputGroup" id="inputGroupName">
                <label>Nombre:</label>
                <input name="name" id="clientPhone" className="inputClient" onChange={(e)=>setClient({...client,[e.target.name]:e.target.value})}></input>
            </div>
            <div className="inputGroup" id="inputGroupPhone">
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