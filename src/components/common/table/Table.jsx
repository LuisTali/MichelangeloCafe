import React, { useState, useContext, useEffect } from "react";
import { TableOrdersPopUp } from "../tableOrdersPopUp/TableOrdersPopUp.jsx";
import { ModalContext } from "../../../context/ModalContext.jsx";
import './Table.css';
import imageWood from '../../../assets/brown-wooden-flooring.jpg';
import { Modal } from "../modal/Modal.jsx";

export const Table = ({id,order,tables,setTables}) =>{
    const [ordersOpen,setOrdersOpen] = useState(false);
    const [answer,setAnswer] = useState(''); //Se usa para que el modal setee una respuesta y poder cobrar la mesa o no.
    const {isModalOpen,setModalOpen,modalContent,setModalContent,successModal,setSuccessModal} = useContext(ModalContext);
    
    const handleClick = () =>{
        setOrdersOpen(!ordersOpen);
    }

    const handleItemsClick = (e) =>{
        e.stopPropagation();
    }

    const handleCharge = (e) =>{
        e.stopPropagation();
        setSuccessModal(3);
        setModalContent(`Desea cobrar la Mesa ${id}`);
        setModalOpen(true);
        tables.filter((table) => table.id == id).map((table) => table.order = []);
        setTables(tables);
    }

    useEffect(()=>{
        if(answer == 'yes'){

        }
        setAnswer('');
    },[answer])

    return <>
    <div className="table" id={`table${id}`} onClick={()=>handleClick()} style={{backgroundImage:`url(${imageWood})`}}>
        <ul className="orderList" onClick={(e)=>handleItemsClick(e)}>
            {order.map((item) => <li>{item}</li>)}
        </ul>
        <h2>{`Mesa ${id}`}</h2>
        <button className="buttonCharge" onClick={(e)=>handleCharge(e)}>COBRAR</button>
    </div>
    {ordersOpen && <TableOrdersPopUp id={id} order={order} tables={tables} setTables={setTables} setOrdersOpen={setOrdersOpen}/>}
    {//SuccessModal == 3 ya que es el numero asignado para que sea un Modal Confirmacion, si quito eso se abren todos los modals.
    (isModalOpen && successModal == 3) && <Modal state={successModal} setIsOpen={setModalOpen} message={modalContent} setAnswer={setAnswer}/>
    }
    </> 
        
}