import React, { useEffect, useState } from "react";
import './TablesPage.css';
import { Table } from "../../common/table/Table";
import { db } from "../../../firebaseConfig.jsx";
import {doc,collection,documentId,getDocs,where,query, Firestore} from 'firebase/firestore';
import kitchenFloor from '../../../assets/kitchenFloor.jpg';

export const TablesPage = () =>{
    
    //const [tables,setTables] = useState([{id:1,order:[]},{id:2,order:[]},{id:3,order:[]},{id:4,order:[]},{id:5,order:[]}]);
    const [tables,setTables] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        let tablesDb
        getDocs(collection(db,"Tables"))
        .then((res)=>{
            //setLoading(false);
            tablesDb = res.docs.map((table)=>{
                return {
                    ...table.data()
                }
            })
            setTables(tablesDb);
        })  
        .catch((err) => console.log(err));  
    },[])

    if(loading) return <div className="tablesPage loading" style={{backgroundImage:`url(${kitchenFloor})`}}>
        <h2>Loading...</h2>
    </div>
    

    return <div className="tablesPage" style={{backgroundImage:`url(${kitchenFloor})`}}>
        <div className="tables">
            {tables.map((table) => <Table key={table.id} id={table.id} order={table.order} tables={tables} setTables={setTables}/>)}
        </div>
    </div>

}
