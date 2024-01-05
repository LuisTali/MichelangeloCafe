import React, { useState, useContext, useEffect, useRef } from "react";
import { TableOrdersPopUp } from "../tableOrdersPopUp/TableOrdersPopUp.jsx";
import { ModalContext } from "../../../context/ModalContext.jsx";
import './Table.css';
import imageWood from '../../../assets/brown-wooden-flooring.jpg';
import { Modal } from "../modal/Modal.jsx";
import { PopupOpenContext } from "../../../context/PopUpOpenContext.jsx";
import { setDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig.jsx";
import { TablesContext } from "../../../context/TablesContext.jsx";

export const Table = ({id,order,openTable}) =>{
    const [ordersOpen,setOrdersOpen] = useState(false);
    const {tables,setTables} = useContext(TablesContext);
    const [chargeId,setChargeId] = useState(); //Se creo para setear el Id de la mesa a cobrar, ya que useEffect obtenia siempre el ultimo Id del arreglo Tables.
    const [answer,setAnswer] = useState(''); //Se usa para que el modal setee una respuesta y poder cobrar la mesa o no.
    const [isOpenTable,setOpenTable] = useState(openTable);
    const [client,setClient] = useState({});
    const {isModalOpen,setModalOpen,modalContent,setModalContent,stateModal,setStateModal} = useContext(ModalContext);
    const {isPopupOpen,setPopupOpen} = useContext(PopupOpenContext);
    
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    
    const handleClick = () =>{
        if(isPopupOpen == false){
            if(isOpenTable == 'yes'){
                setPopupOpen(true);
                setOrdersOpen(!ordersOpen);
            }else{
                setChargeId(id);
                setPopupOpen(true);
                setStateModal(3);
                setModalContent("Desea abrir la mesa " + id + "?")
                setModalOpen(true);
            }
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
            setStateModal(4); //3 es el Modal para confirmar
            let sum = 0;
            order.map((item) =>{
                sum += item.price
            });
            setModalContent(`Desea cobrar la Mesa ${id}. Importe total: $${sum}`);
            setModalOpen(true);
        }
    }

    const makeDate = () =>{
        let date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:${date.getSeconds()}`
    }

    const handleOpenTable = (flag) =>{
        console.log(openTable);
        if(openTable == ''){
            let newTables = [...tables];
            newTables.map((table)=>{
                if(table.id == id) table.openTable = isOpenTable;
            })
            setTables(newTables)
            return;
        }
        if(flag){
            setOpenTable('');
            let newTables = [...tables];
            newTables.map((table)=>{
                if(table.id == id) table.openTable = isOpenTable;
            })
            setTables(newTables)
        }
    }

    useEffect(()=>{
        if(answer == 'yes'){
            let id = generateUUID();

            let total = 0;

            tables[chargeId - 1].order.map((item) =>{
                total += item.price
            });

            let dateFormatted = makeDate();

            let order = {
                client: client.name,
                phone: client.phone,
                date: dateFormatted,
                items:tables[chargeId - 1].order,
                totalPrice: total,
                mesa: `Mesa ${chargeId}`,
            };
            setDoc(doc(db,"Orders",id),order)
            .then((res)=>console.log('exito'))
            .catch((error) => console.log(error));

            let newTables = [...tables]; 
            newTables[chargeId - 1].order = [] //Setea ordenes de la mesa nuevamente a vacio
            setTables(newTables);
            handleOpenTable(true);
            //setOpenTable('no'); //Cierra la mesa
        }
        setChargeId("");
        setPopupOpen(false);
        setAnswer('');
        if(isOpenTable == 'yes') handleOpenTable();
        if(isOpenTable == 'no') setOpenTable(''); //Si elige no abrir la mesa, setea nuevamente a '' para poder cliquear nuevamente el popup AbrirMesa
    },[answer,isOpenTable])

    return <>
    <div className="table" id={`table${id}`} onClick={()=>handleClick()} style={{backgroundImage:`url(${imageWood})`}}>
        <ul className="orderList" onClick={(e)=>handleItemsClick(e)}>
            {order.map((item,index) => <li key={index}>{item.title}</li>)}
        </ul>
        <h2>{`Mesa ${id}`}</h2>
        <button className="buttonCharge" onClick={(e)=>handleCharge(e)}>COBRAR</button>
    </div>
    {ordersOpen && <TableOrdersPopUp id={id} order={order} tables={tables} setTables={setTables} setOrdersOpen={setOrdersOpen} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen}/>}
    {//SuccessModal == 4 ya que es el numero asignado para que sea un Modal Confirmacion + Input, si quito eso se abren todos los modals.
    (isModalOpen && stateModal == 4 && chargeId == id && isOpenTable == 'yes') && <Modal state={stateModal} setIsOpen={setModalOpen} message={modalContent} setAnswer={setAnswer} client={client} setClient={setClient}/>
    }
    {//SuccessModal == 3 ya que es el numero asignado para que sea un Modal Confirmacion, si quito eso se abren todos los modals.
    (isModalOpen && stateModal == 3 && chargeId == id && isOpenTable != 'yes') && <Modal state={stateModal} setIsOpen={setModalOpen} message={modalContent} setAnswer={setOpenTable}/>
}
    </> 
        
}