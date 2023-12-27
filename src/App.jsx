import { useEffect, useState } from 'react'
import Layout from './components/layouts/Layout.jsx';
import ModalContextProvider from './context/ModalContext.jsx';
import PopupOpenContextProvider from './context/PopUpOpenContext.jsx';
import { db } from './firebaseConfig.jsx';
import {doc,collection,documentId,getDocs,where,query} from 'firebase/firestore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { menuRoutes } from './routes/menuRoutes.js';
import './App.css'
import ErrorPage from './components/pages/errorPage/ErrorPage.jsx';

export function App() {

  useEffect(()=>{
    
  },[])

  return (
    <Router>
      <ModalContextProvider>
      <PopupOpenContextProvider>
        <Routes>
          <Route element={<Layout/>}>
            {menuRoutes.map(({id,path,Element}) => <Route key={id} path={path} element={<Element/>}/>)}
            <Route path='*' element={<ErrorPage/>}/>
          </Route>
        </Routes>  
      </PopupOpenContextProvider>
      </ModalContextProvider>
    </Router>
  )
}

