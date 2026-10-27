import { Link } from "react-router";
import page from "../styles/page.module.css"
import links from "../styles/links.module.css"
import styles from "./MembersOnly.module.css"

// Affiché à la place d'une page réservée quand le visiteur n'est pas connecté
export function MembersOnly({message}) {
    return (
        <div className={styles.page}>
            <h1 className={page.heading}>Members only</h1>
            <p className={page.lede}>{message}</p>
            <div className={links.actions}>
                <Link to="/login" className={links.primary}>Log in</Link>
                <Link to="/register" className={links.secondary}>Sign up</Link>
            </div>
        </div>
    )
}
