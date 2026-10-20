import { Link, NavLink, useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import styles from "./Header.module.css"

// NavLink donne isActive : on ajoute la classe .active sur la page en cours
function navClass({ isActive }) {
    return isActive ? `${styles.link} ${styles.active}` : styles.link
}

export function Header({token, setToken, user}) {
    const navigate = useNavigate()
    function logout() {
        localStorage.removeItem("token")
        setToken(null)
        navigate('/')
    }

    return(
        <header className={styles.header}>
          <div className={styles.inner}>
            <Link to="/" className={styles.brand}>My Odin Project blog</Link>

            <nav className={styles.nav} aria-label="Main">
              <NavLink to="/" end className={navClass}>Home</NavLink>
              <NavLink to="/posts" className={navClass}>Posts</NavLink>
              {token ?
                <>
                {user && <span className={styles.greeting}>Hello {user.firstname} {user.lastname[0]}.</span>}
                <button type="button" className={styles.logout} onClick={logout}>
                  <LogOut size={16} aria-hidden="true" />
                  Log out
                </button>
                </>
              :
                <>
                <NavLink to="/login" className={navClass}>Log in</NavLink>
                <NavLink to="/register" className={navClass}>Sign up</NavLink>
                </>
              }
            </nav>
          </div>
        </header>
    )
}
