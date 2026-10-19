import { Link } from "react-router";

export function Header() {
    return(
        <header>
        <h1>My Odin Project blog</h1>
  
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    )
}