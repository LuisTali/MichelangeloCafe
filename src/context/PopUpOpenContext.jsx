import React,{createContext, useState} from "react";

export const PopupOpenContext = createContext();

const PopupOpenContextProvider = ({children}) =>{

    const [isPopupOpen,setPopupOpen] = useState(false);

    const data = {isPopupOpen,setPopupOpen};

    return <PopupOpenContext.Provider value={data}>{children}</PopupOpenContext.Provider>

}

export default PopupOpenContextProvider;