import './App.css'
import { Outlet } from 'react-router'

function App() {
  return (
    <>
    <header>
      <h1>My Odin Project blog</h1>
    </header>
    <main>
      <Outlet/>
    </main>

    <footer>
      <p>Footer for link stuff (repo/odin)</p>
    </footer>
    </>
  )
}

export default App
