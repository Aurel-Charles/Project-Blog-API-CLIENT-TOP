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
        console.log(error);
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
  console.log(user);

  return (
    <>
    <Header token={token} setToken= {setToken} />

    <main>
      <Outlet context={{token, setToken, user}} />
    </main>

    <Footer/>
    </>
  )
}

export default App
