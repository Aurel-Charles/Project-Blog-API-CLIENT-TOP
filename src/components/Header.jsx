import { Link, useNavigate} from "react-router";

export function Header({token, setToken}) {
    const navigate = useNavigate()
    function logout() {
        localStorage.removeItem("token")
        setToken(null)
        navigate('/')
    }

    return(
        <header>
        <h1>My Odin Project blog</h1>
        
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          {token ? 
            <button onClick={logout}>Logout</button>
          : 
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </> 
           }

        </nav>
      </header>
    )
}