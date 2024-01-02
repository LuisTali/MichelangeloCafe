import React,{useState,createContext} from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({children}) =>{
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState("");
    const [stateModal,setStateModal] = useState(false);

    const data = {
        isModalOpen,setModalOpen,modalContent,setModalContent,stateModal,setStateModal
    }

    return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>

}

export default ModalContextProvider;