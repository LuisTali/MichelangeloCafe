import React, { useContext, useEffect, useState } from "react";
import './TablesPage.css';
import { Table } from "../../common/table/Table";
import { db } from "../../../firebaseConfig.jsx";
import {doc,collection,documentId,getDocs,where,query, Firestore, orderBy} from 'firebase/firestore';
import kitchenFloor from '../../../assets/kitchenFloor.jpg';
import { TablesContext } from "../../../context/TablesContext.jsx";

export const TablesPage = () =>{
    
    //const [tables,setTables] = useState([]);
    const [loading,setLoading] = useState(true);
    const {tables,setTables} = useContext(TablesContext);
    
    useEffect(()=>{
        console.log(tables);
        if(tables.length < 1){
            let tablesDb;
            const tableCollection = collection(db,"Tables");
            getDocs(query(tableCollection,orderBy('id')))
            .then((res)=>{
            tablesDb = res.docs.map((table)=>{
                return {
                    ...table.data(),
                    order: []
                }
            })
            setTables(tablesDb);
        })  
        .catch((err) => console.log(err));  
        }
        setLoading(false);
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
