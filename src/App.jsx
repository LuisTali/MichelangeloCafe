import { useContext, useEffect, useState } from 'react'
import Layout from './components/layouts/Layout.jsx';
import ModalContextProvider from './context/ModalContext.jsx';
import PopupOpenContextProvider from './context/PopUpOpenContext.jsx';
import TablesContextProvider from './context/TablesContext.jsx';
import { TablesContext } from './context/TablesContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { menuRoutes } from './routes/menuRoutes.js';
import './App.css'
import { db } from "./firebaseConfig.jsx";
import {doc,collection,documentId,getDocs,where,query, Firestore, orderBy} from 'firebase/firestore';
import ErrorPage from './components/pages/errorPage/ErrorPage.jsx';

export function App() {

  const [loading,setLoading] = useState(true);
  //const {tables,setTables} = useContext(TablesContext);

  useEffect(()=>{
    /*let tablesDb;
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
        .catch((err) => console.log(err));  */
  },[])

  return (
    <Router>
      <ModalContextProvider>
      <PopupOpenContextProvider>
      <TablesContextProvider>
        <Routes>
          <Route element={<Layout/>}>
            {menuRoutes.map(({id,path,Element}) => <Route key={id} path={path} element={<Element/>}/>)}
            <Route path='*' element={<ErrorPage/>}/>
          </Route>
        </Routes>  
      </TablesContextProvider> 
      </PopupOpenContextProvider>
      </ModalContextProvider>
    </Router>
  )
}

