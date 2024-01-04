import React,{useRef,useContext, useState} from "react";
import { Modal } from "../modal/Modal.jsx";
import { ModalContext } from "../../../context/ModalContext.jsx";
import './TableOrdersPopUp.css';
import { products } from "../../../Data/products.jsx";


export const TableOrdersPopUp = ({id,order,tables,setTables,setOrdersOpen,isPopupOpen, setPopupOpen,openTable}) =>{
    const [search,setSearch] = useState("");
    //const [newOrder,setNewOrder] = useState(products[0]);
    const {isModalOpen,setModalOpen,modalContent,setModalContent,stateModal,setStateModal} = useContext(ModalContext);
    
    const handleSubmit = () =>{
        let selectOrder = document.getElementById("selectOrder"); //Obtiene select
        let newOrder = products.filter((product) => product.title == selectOrder.value); //Setea producto con el encontrado en el select
        order.push(newOrder[0]); //Pushea el producto al arreglo Orden asociado a la mesa
        let newTables = [...tables];
        newTables.filter((table) => table.id == id).map((table) => table.order = order); //Setea la orden de la mesa en base a su Id
        setTables(newTables); //Setea las mesas con las ordenes nuevas
        setSearch(''); //Devuelve el filtro de busqueda a default
        selectOrder.selectedIndex = 0; //Select posicionado de vuelta al primer producto
        document.getElementById("filterSelect").value = ''; //No uso mas useRef asi que cambio su valor asi
        setModalContent("Producto agregado correctamente");
        setStateModal(1);
        setModalOpen(true);
    }

    const closePopUp = () =>{
        setOrdersOpen(false);
        setPopupOpen(false);
    }

    return <div id={`popUpTableOrder${id}`} className='popUpTableOrder'>
        <label>{`Ordenes Mesa ${id}`}</label>

        <input id="filterSelect" type="text" onChange={(e) => setSearch(e.target.value)}></input>
        <select id="selectOrder">
            {products.filter((product) => (search != '' ? product.title.toLowerCase().startsWith(search.toLowerCase()) : product)).map((product,index) => <option key={index}>{product.title}</option>)}
        </select>

        <button onClick={handleSubmit}>SUBMIT</button>
        <button onClick={closePopUp} id="closePopUpButton">X</button>
        {isModalOpen && <Modal setIsOpen={setModalOpen} state={stateModal} message={modalContent}/>}
    </div>
}