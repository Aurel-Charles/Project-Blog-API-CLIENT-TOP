import { Link } from "react-router";
import page from "../styles/page.module.css"
import styles from "./Account.module.css"
import links from "../styles/links.module.css"

export function AccountDeleted() {
    return (
        <div className={styles.page}>
            <h1 className={page.heading}>Your account has been deleted</h1>
            <p className={page.lede}>Your comments stay on the blog, without a link to your account. Thanks for reading.</p>
            <div className={links.actions}>
                <Link to="/" className={links.primary}>Back to the blog</Link>
            </div>
        </div>
    )
}
