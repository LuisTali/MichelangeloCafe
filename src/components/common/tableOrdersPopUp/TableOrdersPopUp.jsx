import React,{useRef} from "react";
import './TableOrdersPopUp.css';

export const TableOrdersPopUp = ({id,order,tables,setTables,setOrdersOpen}) =>{
    const inputRef = useRef(null);
    
    const handleSubmit = () =>{
        order.push(inputRef.current.value);
        tables.filter((table) => table.id == id).map((table) => table.order = order);
        setTables(tables);
        inputRef.current.value = "";
    }

    const closePopUp = () =>{
        setOrdersOpen(false);
    }

    const handleCharge = () =>{
        tables.filter((table) => table.id == id).map((table) => table.order = []);
        setTables(tables);
        console.log(order);
    }
    
    return <div id={`popUpTableOrder${id}`} className='popUpTableOrder'>
        <label>{`Ordenes Mesa ${id}`}</label>
        <input type="text" ref={inputRef}></input>
        <button onClick={handleSubmit}>SUBMIT</button>
        <button onClick={closePopUp} id="closePopUpButton">X</button>
        <button onClick={handleCharge}>COBRAR</button>
    </div>
}