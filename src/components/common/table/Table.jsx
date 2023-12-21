import React, { useState, useContext, useEffect, useRef } from "react";
import { TableOrdersPopUp } from "../tableOrdersPopUp/TableOrdersPopUp.jsx";
import { ModalContext } from "../../../context/ModalContext.jsx";
import './Table.css';
import imageWood from '../../../assets/brown-wooden-flooring.jpg';
import { Modal } from "../modal/Modal.jsx";
import { PopupOpenContext } from "../../../context/PopUpOpenContext.jsx";

export const Table = ({id,order,tables,setTables}) =>{
    const [ordersOpen,setOrdersOpen] = useState(false);
    const [chargeId,setChargeId] = useState();
    const [answer,setAnswer] = useState(''); //Se usa para que el modal setee una respuesta y poder cobrar la mesa o no.
    const {isModalOpen,setModalOpen,modalContent,setModalContent,successModal,setSuccessModal} = useContext(ModalContext);
    const {isPopupOpen,setPopupOpen} = useContext(PopupOpenContext);
    
    const handleClick = () =>{
        if(isPopupOpen == false){
            setPopupOpen(true);
            setOrdersOpen(!ordersOpen);
        }
    }

    const handleItemsClick = (e) =>{
        e.stopPropagation();
    }

    const handleCharge = (e) =>{
        e.stopPropagation();
        if(isPopupOpen == false && order.length > 0){
            setChargeId(id);
            setPopupOpen(true);
            setSuccessModal(3); //3 es el Modal para confirmar
            let sum = 0;
            order.map((item) =>{
                sum += item.price
            });
            setModalContent(`Desea cobrar la Mesa ${id}. Importe total: $${sum}`);
            setModalOpen(true);
        }
    }

    useEffect(()=>{
        if(answer == 'yes'){
            let newTables = [...tables]; 
            console.log(tables[chargeId - 1]);
            newTables[chargeId - 1].order = []
            setTables(newTables);
        }
        setChargeId("");
        setPopupOpen(false);
        setAnswer('');
    },[answer])

    return <>
    <div className="table" id={`table${id}`} onClick={()=>handleClick()} style={{backgroundImage:`url(${imageWood})`}}>
        <ul className="orderList" onClick={(e)=>handleItemsClick(e)}>
            {order.map((item,index) => <li key={index}>{item.title}</li>)}
        </ul>
        <h2>{`Mesa ${id}`}</h2>
        <button className="buttonCharge" onClick={(e)=>handleCharge(e)}>COBRAR</button>
    </div>
    {ordersOpen && <TableOrdersPopUp id={id} order={order} tables={tables} setTables={setTables} setOrdersOpen={setOrdersOpen} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen}/>}
    {//SuccessModal == 3 ya que es el numero asignado para que sea un Modal Confirmacion, si quito eso se abren todos los modals.
    (isModalOpen && successModal == 3 && chargeId == id) && <Modal state={successModal} setIsOpen={setModalOpen} message={modalContent} setAnswer={setAnswer}/>
    }
    </> 
        
}