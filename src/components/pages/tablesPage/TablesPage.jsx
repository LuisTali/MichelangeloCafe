import React from "react";
import './TablesPage.css';
import { Table } from "../../common/table/Table";

export const TablesPage = () =>{
    const array = [1,2,3,4,5]
    return <div className="tablesPage">
        <div className="tables">
            {array.map((table) => <Table key={table}/>)}
        </div>
    </div>

}
