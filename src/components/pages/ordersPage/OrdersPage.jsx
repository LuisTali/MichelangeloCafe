import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig.jsx";
import {doc,collection,documentId,getDocs,where,query, Firestore, orderBy} from 'firebase/firestore';
import './OrdersPage.css';

const OrdersPage = () =>{

    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [filter,setFilter] = useState("date");
    const [order,setOrder] = useState("desc"); //Order Asc or Desc

    const handleClickOrder = () =>{
        let selectFilter = document.getElementById("selectFilter");
        let orderFilter = document.getElementById("orderFilter");
        setFilter(selectFilter.value);
        setOrder(orderFilter.value);
    }

    useEffect(()=>{
        const ordersCollection = collection(db,"Orders");
        getDocs(query(ordersCollection,orderBy(filter,order)))
        .then((res)=>{
            let ordersDb = res.docs.map((item) =>{ 
                return {
                    ...item.data(),
                    id:item.id
                }
            })
            setOrders(ordersDb);
            setLoading(false);
        })
        .catch((error) => console.log(error))
    },[order]);

    if(loading != true){
        return <div className="ordersPage">
            <div className="filterOrderDiv">
                <div className="selectGroup">
                    <label>Ordenar por:</label>
                    <select id="selectFilter">
                        <option value="client">Cliente</option>
                        <option defaultValue selected value="date">Fecha</option>
                        <option value="totalPrice">Precio</option>
                    </select>
                </div>
                <div className="selectGroup">
                    <label>Orden:</label>
                    <select id="orderFilter">
                        <option value="asc">Ascendente</option>
                        <option defaultValue selected value="desc">Descendente</option>
                    </select>
                </div>
                <button onClick={()=>handleClickOrder()}>ORDENAR</button>
            </div>
            <div className="orders">
                {orders.map((order,index)=>{
                    return <div className="order" key={index}>
                        <h4>Id Orden: {order.id}</h4>
                        <h3>Cliente: {order.client}</h3>
                        <h4>Telefono: {order.phone}</h4>
                        <h4>{order.mesa}</h4>
                        <div className="orderItems">
                            {order.items.map((item,index) => <li key={index}>{item.title} - ${item.price}</li>)}
                        </div>
                        <h4>Total: ${order.totalPrice}</h4>
                        <h5>Fecha: {order.date}</h5>
                        
                    </div>
                })}
            </div>
        </div>
    }else return <div className="ordersPage">
        <h3>Loading...</h3>
    </div>

}

export default OrdersPage;