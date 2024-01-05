import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig.jsx";
import {doc,collection,documentId,getDocs,where,query, Firestore, orderBy} from 'firebase/firestore';
import './OrdersPage.css';

const OrdersPage = () =>{

    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [filter,setFilter] = useState("date");

    const handleClickOrder = () =>{
        let selectFilter = document.getElementById("selectFilter");
        setFilter(selectFilter.value);
        console.log(selectFilter.value);
    }

    useEffect(()=>{
        const ordersCollection = collection(db,"Orders");
        getDocs(query(ordersCollection,orderBy(filter,"desc")))
        .then((res)=>{
            console.log(res);
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
    },[filter]);

    if(loading != true){
        return <div className="ordersPage">
            <select id="selectFilter">
                <option>client</option>
                <option selected>date</option>
                <option>totalPrice</option>
            </select>
            <button onClick={()=>handleClickOrder()}>ORDENAR</button>
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