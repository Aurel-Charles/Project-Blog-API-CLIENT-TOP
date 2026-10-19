import './App.css'
import { Outlet } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState(()=> localStorage.getItem("token"))

  return (
    <>
    <Header token={token} setToken= {setToken} />

    <main>
      <Outlet context={{token, setToken}} />
    </main>

    <Footer/>
    </>
  )
}

export default App
