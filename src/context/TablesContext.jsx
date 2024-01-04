import React,{useState,createContext} from "react";

export const TablesContext = createContext();

const TablesContextProvider = ({children}) =>{

    const [tables,setTables] = useState([]);

    const data = {tables,setTables};

    return <TablesContext.Provider value={data}>{children}</TablesContext.Provider>

}

export default TablesContextProvider;