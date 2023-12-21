import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TablesPage } from './components/pages/tablesPage/TablesPage.jsx';
import ModalContextProvider from './context/ModalContext.jsx';
import PopupOpenContextProvider from './context/PopUpOpenContext.jsx';
import './App.css'

export function App() {

  return (
    <ModalContextProvider>
    <PopupOpenContextProvider>
      <div>
        <TablesPage/>
      </div>
    </PopupOpenContextProvider>
    </ModalContextProvider>
  )
}

