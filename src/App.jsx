import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TablesPage } from './components/pages/tablesPage/TablesPage.jsx';
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TablesPage/>
    </div>
  )
}

