import './App.css'
import { Outlet } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useEffect, useState } from 'react'
import { apiFetch } from './api/api'

function App() {
  const [token, setToken] = useState(()=> localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  useEffect(()=> {
    async function getUser() {
      if (!token) {
        return setUser(null)
      }
      try {
        const data = await apiFetch("/auth/me")
        setUser(data)
      } catch (error) {
        console.error(error);
        if (error.status === 401) {
          localStorage.removeItem("token")
          setToken(null)
        }
      }
    }
    getUser()
    
  },
  [token]
)

  return (
    <>
    <Header token={token} setToken= {setToken} user={user} />

    <main>
      <Outlet context={{token, setToken, user}} />
    </main>

    <Footer/>
    </>
  )
}

export default App
