import React,{useState,createContext} from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({children}) =>{
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState("");
    const [successModal,setSuccessModal] = useState(false);

    const data = {
        isModalOpen,setModalOpen,modalContent,setModalContent,successModal,setSuccessModal
    }

    return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>

}

export default ModalContextProvider;