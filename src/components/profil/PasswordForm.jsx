import { useState } from "react"
import { useOutletContext } from "react-router"
import { FieldErrors } from "../FieldErrors"
import { LoaderPinwheel } from "lucide-react"
import { apiFetch } from "../../api/api"
import page from "../../styles/page.module.css"
import styles from "./ProfilForm.module.css"

export function PasswordForm() {
    const {setToken} = useOutletContext()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
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
            const body = {currentPassword, newPassword, confirmNewPassword}
            const {token} = await apiFetch(`/auth/me/password`, "PATCH", body)
            localStorage.setItem("token", token)
            setToken(token)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmNewPassword("")
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

            <div className={`${styles.fields} ${styles.stacked}`}>
                <div>
                    <label htmlFor="password-current-password">Current password</label>
                    <input type="password" name="currentPassword" id="password-current-password" autoComplete="current-password" onChange={(e)=> storeValue(setCurrentPassword, e)} value={currentPassword} />
                    <FieldErrors error={error} field={"currentPassword"}/>
                </div>

                <div>
                    <label htmlFor="newPassword">Set a new password</label>
                    <input type="password" name="newPassword" id="newPassword" autoComplete="new-password" onChange={(e)=> storeValue(setNewPassword, e)} value={newPassword} />
                    <FieldErrors error={error} field={"newPassword"}/>
                </div>

                <div>
                    <label htmlFor="confirmNewPassword">Confirm your new password</label>
                    <input type="password" name="confirmNewPassword" id="confirmNewPassword" autoComplete="new-password" onChange={(e)=> storeValue(setConfirmNewPassword, e)} value={confirmNewPassword} />
                    <FieldErrors error={error} field={"confirmNewPassword"}/>
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
                    {isSaved && "Password updated."}
                </p>
            </div>
        </form>
    )
}
