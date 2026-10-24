import { Link, useOutletContext } from "react-router"
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import styles from "./Account.module.css"
import { MyComments } from "../components/comments/MyComments";

export function Account() {
    const {token , user} = useOutletContext()

    if (!token) {
        return (
            <div className={styles.page}>
                <h1 className={page.heading}>Members only</h1>
                <p className={page.lede}>You need an account to view this page. Log in, or create one in a few seconds.</p>
                <div className={styles.actions}>
                    <Link to="/login" className={styles.primary}>Log in</Link>
                    <Link to="/register" className={styles.secondary}>Sign up</Link>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <Loader size={22} />
        )
    }

    return (
        <div className={styles.page}>
            <h1 className={page.heading}>My account</h1>
            <p className={page.lede}>The information linked to your account.</p>

            <dl className={styles.details}>
                <div className={styles.row}>
                    <dt>Firstname</dt>
                    <dd>{user.firstname}</dd>
                </div>

                <div className={styles.row}>
                    <dt>Lastname</dt>
                    <dd>{user.lastname}</dd>
                </div>

                <div className={styles.row}>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                </div>

                <div className={styles.row}>
                    <dt>Role</dt>
                    <dd>{user.role === "ADMIN" ? "Administrator" : "Member"}</dd>
                </div>
            </dl>

            <MyComments/>
        </div>
    )
}
