import { useState } from "react"
import { useOutletContext } from "react-router"
import { FieldErrors } from "../FieldErrors"
import { LoaderPinwheel } from "lucide-react"
import { apiFetch } from "../../api/api"
import page from "../../styles/page.module.css"
import styles from "./ProfilForm.module.css"

export function ProfilForm() {
    const {user ,setUser} = useOutletContext()
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [isSaved, setIsSaved] = useState(false)

    // Dès qu'on retape, l'ancien message « Profile updated » n'a plus de sens
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
            const body = {firstname , lastname}
            const updatedUser = await apiFetch(`/auth/me`, "PATCH", body)
            setUser(updatedUser)
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
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" name="firstname" id="firstname" autoComplete="given-name" onChange={(e)=> storeValue(setFirstname, e)} value={firstname} />
                    <FieldErrors error={error} field={"firstname"}/>
                </div>

                <div>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" name="lastname" id="lastname" autoComplete="family-name" onChange={(e)=> storeValue(setLastname, e)} value={lastname} />
                    <FieldErrors error={error} field={"lastname"}/>
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
                    {isSaved && "Profile updated."}
                </p>
            </div>
        </form>
    )
}
