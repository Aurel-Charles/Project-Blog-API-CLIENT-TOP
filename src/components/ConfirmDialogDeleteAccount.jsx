import { useEffect, useRef, useState } from "react"
import styles from "./ConfirmDialog.module.css"
import { FieldErrors } from "./FieldErrors"
import { apiFetch } from "../api/api"
import { useNavigate, useOutletContext } from "react-router"
import page from "../styles/page.module.css"
import { LoaderPinwheel } from "lucide-react"

export function ConfirmDialogDeleteAccount({ isOpen, message, onCancel }) {
    const navigate = useNavigate()
    const dialogRef = useRef(null)
    const {setToken} = useOutletContext()
    const [error, setError] = useState(null)
    const [currentPassword, setCurrentPassword] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    
    function storeValue(setValue, e) {
        setValue(e.target.value)
    }

    useEffect(() => {
        const dialog = dialogRef.current
        if (isOpen) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }, [isOpen])

    async function handleDelete(e) {
        setIsDeleting(true)
        e.preventDefault()
        setError(null)
        try {
            await apiFetch("/auth/me", "DELETE", {currentPassword})
            navigate('/account-deleted')
            localStorage.removeItem("token")
            setToken(null)
        } catch (error) {
            console.error(error);
            setError(error)
        }finally{
            setIsDeleting(false)
            setCurrentPassword("")
        }
    }

    return (
        <dialog ref={dialogRef} className={styles.dialog} onClose={onCancel}>
            <p className={styles.message}>{message}</p>

            {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}
            <form className={styles.form} onSubmit={handleDelete}>
                <div>
                    <label htmlFor="delete-current-password">Confirm with your current password</label>
                    <input type="password" name="currentPassword" id="delete-current-password" autoComplete="current-password" onChange={(e)=> storeValue(setCurrentPassword, e)} value={currentPassword} />
                    <FieldErrors error={error} field={"currentPassword"}/>
                </div>
                <div className={styles.actions}>
                    <button type="button" className={styles.cancel} onClick={onCancel} disabled={isDeleting}>
                        Cancel
                    </button>
                    <button type="submit" disabled={isDeleting} className={styles.confirm}>
                        {isDeleting ? (
                            <>
                            <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                            Deleting…
                            </>
                        ) : "Delete my account"}
                    </button>
                </div>
            </form>
        </dialog>
    )
}