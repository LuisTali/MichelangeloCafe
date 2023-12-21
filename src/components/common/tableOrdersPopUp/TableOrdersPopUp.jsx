import React,{useRef,useContext, useState} from "react";
import { Modal } from "../modal/Modal.jsx";
import { ModalContext } from "../../../context/ModalContext.jsx";
import './TableOrdersPopUp.css';
import { products } from "../../../Data/products.jsx";


export const TableOrdersPopUp = ({id,order,tables,setTables,setOrdersOpen,isPopupOpen, setPopupOpen}) =>{
    const inputRef = useRef(null);
    const [newOrder,setNewOrder] = useState(products[0]);
    const selectRef = useRef(products[0]);
    const {isModalOpen,setModalOpen,modalContent,setModalContent,successModal,setSuccessModal} = useContext(ModalContext);
    
    const handleSubmit = () =>{
        order.push(newOrder);
        let newTables = [...tables];
        newTables.filter((table) => table.id == id).map((table) => table.order = order);
        setTables(newTables);
        inputRef.current.value = "";
        document.getElementById("selectOrder").selectedIndex = 0;
        setNewOrder(products[0]);
        setModalContent("Producto agregado correctamente");
        setSuccessModal(1);
        setModalOpen(true);
    }

    const handleSelect = (e) =>{
        let order = products.filter((product) => product.title == e.currentTarget.value);
        setNewOrder(order[0]);
    }

    const closePopUp = () =>{
        setOrdersOpen(false);
        setPopupOpen(false);
    }
    
    return <div id={`popUpTableOrder${id}`} className='popUpTableOrder'>
        <label>{`Ordenes Mesa ${id}`}</label>
        <input type="text" ref={inputRef}></input>
        <select id="selectOrder" onChange={(e)=>handleSelect(e)} ref={selectRef}>
            {products.map((product,index) => <option key={index}>{product.title}</option>)}
        </select>
        <button onClick={handleSubmit}>SUBMIT</button>
        <button onClick={closePopUp} id="closePopUpButton">X</button>
        {isModalOpen && <Modal setIsOpen={setModalOpen} state={successModal} message={modalContent}/>}
    </div>
}