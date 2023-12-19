import React, { useState } from "react";
import { TableOrdersPopUp } from "../tableOrdersPopUp/TableOrdersPopUp.jsx";
import './Table.css';

export const Table = ({id,order,tables,setTables}) =>{
    const [ordersOpen,setOrdersOpen] = useState(false);

    const handleClick = () =>{
        setOrdersOpen(!ordersOpen);
    }

    return <>
    <div className="table" id={`table${id}`} onClick={()=>handleClick()}>
        <ul>
            {order.map((item) => <li>{item}</li>)}
        </ul>
    </div>
    {ordersOpen && <TableOrdersPopUp id={id} order={order} tables={tables} setTables={setTables} setOrdersOpen={setOrdersOpen}/>}
    </> 
        
}