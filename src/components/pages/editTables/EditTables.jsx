import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig.jsx";
import {doc,collection,documentId,getDocs,where,query, Firestore, orderBy} from 'firebase/firestore';
import './EditTables.css';

const EditTables = () =>{

    const [tables,setTables] = useState([]);
    const [loading,setLoading] = useState(true);

    const handleDeleteClick = (id) =>{
        alert('Delete Table ' + id)
    }

    const handleAddClick = () =>{
        
    }

    useEffect(()=>{
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
            setLoading(false);
        })  
        .catch((err) => console.log(err));  
    },[])
    
    if(loading){
        return <div className="editTablesPage loading">
            <h2>Loading<span>...</span></h2>
        </div>
    }

    return <div className="editTablesPage">
        <div className="tables">
            {tables.map((table)=>{
                return <div className="table">
                    <h2>Mesa {table.id}</h2>
                    <button onClick={(e)=>handleDeleteClick(table.id)}>ELIMINAR</button>
                </div>
            })}
            <div className="table addTable">
                    <h2>Añadir Mesa</h2>
                    <button onClick={(e)=>handleAddClick()}>AÑADIR</button>
            </div>
        </div>

    </div>

}

export default EditTables;