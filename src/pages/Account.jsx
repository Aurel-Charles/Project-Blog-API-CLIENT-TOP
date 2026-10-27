import { Link, useOutletContext } from "react-router"
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import styles from "./Account.module.css"
import { MyComments } from "../components/comments/MyComments";
import { ProfilForm } from "../components/profil/ProfilForm";
import { EmailForm } from "../components/profil/EmailForm";
import { PasswordForm } from "../components/profil/PasswordForm";
import { useState } from "react";
import { ConfirmDialogDeleteAccount } from "../components/ConfirmDialogDeleteAccount";

export function Account() {
    const {token , user} = useOutletContext()
    const [isEditing, setIsEditing] = useState(false)

    const [isOpen, setIsOpen] = useState(false)

    function toggleIsEdit() {
        setIsEditing(!isEditing)
    }

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
        <div className={styles.top}>
            <h1 className={page.heading}>My account</h1>
            <button type="button" className={styles.toggle} onClick={toggleIsEdit}>
                {isEditing ? "Done" : "Edit"}
            </button>
        </div>
        {!isEditing ? 
        <div>
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
        : 
        <div>
            <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Edit profile</h2>
                <ProfilForm/>
            </section>
            <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Edit email</h2>
                <EmailForm/>
            </section>
            <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Edit password</h2>
                <PasswordForm/>
            </section>


            {user.role !== "ADMIN" && 
            <section className={`${styles.section} ${styles.dangerZone}`}>
                <h2 className={styles.sectionHeading}>Delete account</h2>
                <p className={styles.sectionText}>Your account and personal details are removed for good. Your comments stay on the blog under your name, without a link to your account.</p>
                <div>
                    <button type="button" className={styles.danger} onClick={()=> setIsOpen(true)}>
                        Delete my account
                    </button>
                    <ConfirmDialogDeleteAccount isOpen={isOpen} onCancel={()=>setIsOpen(false)} message={"Are you sure you want to delete your account? This cannot be undone."}/>
                </div>
            </section>
            }
        </div>           
        }   


        </div>
    )
}
