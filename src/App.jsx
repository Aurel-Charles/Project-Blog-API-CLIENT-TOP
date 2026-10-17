import './App.css'
import { Link, Outlet } from 'react-router'

function App() {
  return (
    <>
    <header>
      <h1>My Odin Project blog</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
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
