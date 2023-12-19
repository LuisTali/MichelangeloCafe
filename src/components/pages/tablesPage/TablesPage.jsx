import React, { useState } from "react";
import './TablesPage.css';
import { Table } from "../../common/table/Table";

export const TablesPage = () =>{
    const [tables,setTables] = useState([{id:1,order:[]},{id:2,order:[]},{id:3,order:[]},{id:4,order:[]},{id:5,order:[]}]);

    return <div className="tablesPage">
        <div className="tables">
            {tables.map((table) => <Table key={table.id} id={table.id} order={table.order} tables={tables} setTables={setTables}/>)}
        </div>
    </div>

}
