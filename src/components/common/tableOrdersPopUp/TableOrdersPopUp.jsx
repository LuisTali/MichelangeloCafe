import React,{useRef,useContext} from "react";
import { Modal } from "../modal/Modal.jsx";
import { ModalContext } from "../../../context/ModalContext.jsx";
import './TableOrdersPopUp.css';
import { products } from "../../../Data/products.jsx";


export const TableOrdersPopUp = ({id,order,tables,setTables,setOrdersOpen}) =>{
    const inputRef = useRef(null);
    const {isModalOpen,setModalOpen,modalContent,setModalContent,successModal,setSuccessModal} = useContext(ModalContext);
    
    const handleSubmit = () =>{
        order.push(inputRef.current.value);
        tables.filter((table) => table.id == id).map((table) => table.order = order);
        setTables(tables);
        inputRef.current.value = "";
        setModalContent("Producto agregado correctamente");
        setSuccessModal(1);
        setModalOpen(true);
    }

    const closePopUp = () =>{
        setOrdersOpen(false);
    }
    
    return <div id={`popUpTableOrder${id}`} className='popUpTableOrder'>
        <label>{`Ordenes Mesa ${id}`}</label>
        <input type="text" ref={inputRef}></input>
        <select>
            {products.filter((product) => product.title.startsWith(inputRef.current.value)).map((product) => <option>{product.title}</option>)}
        </select>
        <button onClick={handleSubmit}>SUBMIT</button>
        <button onClick={closePopUp} id="closePopUpButton">X</button>
        {isModalOpen && <Modal setIsOpen={setModalOpen} state={successModal} message={modalContent}/>}
    </div>
}