import { useState } from "react"
import { useOutletContext } from "react-router"
import { FieldErrors } from "../FieldErrors"
import { LoaderPinwheel } from "lucide-react"
import { apiFetch } from "../../api/api"
import page from "../../styles/page.module.css"
import styles from "./ProfilForm.module.css"

export function EmailForm() {
    const {user ,setUser} = useOutletContext()
    const [email, setEmail] = useState(user.email)
    const [currentPassword, setCurrentPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [isSaved, setIsSaved] = useState(false)


    function storeValue(setValue, e) {
        setValue(e.target.value)
        setIsSaved(false)
    }

    async function submit(e) {
        e.preventDefault()
        setError(null)
        setIsSaved(false)
        setIsSubmitting(true)
        try {
            const body = {email , currentPassword}
            const updatedUser = await apiFetch(`/auth/me/email`, "PATCH", body)
            setUser(updatedUser)
            setCurrentPassword("")
            setIsSaved(true)
        } catch (error) {
            console.error(error);
            setError(error)
        }
        finally{
            setIsSubmitting(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}

            <div className={styles.fields}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" autoComplete="email" onChange={(e)=> storeValue(setEmail, e)} value={email} />
                    <FieldErrors error={error} field={"email"}/>
                </div>

                <div>
                    <label htmlFor="email-current-password">Confirm with your current password</label>
                    <input type="password" name="currentPassword" id="email-current-password" autoComplete="current-password" onChange={(e)=> storeValue(setCurrentPassword, e)} value={currentPassword} />
                    <FieldErrors error={error} field={"currentPassword"}/>
                </div>
            </div>

            <div className={styles.footer}>
                <button type="submit" className={styles.submit} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                        Saving…
                        </>
                    ) : "Save"}
                </button>

                {/* role="status" : le message est annoncé par les lecteurs d'écran */}
                <p className={styles.saved} role="status">
                    {isSaved && "Email updated."}
                </p>
            </div>
        </form>
    )
}
