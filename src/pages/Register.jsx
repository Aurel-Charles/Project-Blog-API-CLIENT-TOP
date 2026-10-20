import { useState } from "react"
import { apiFetch } from "../api/api"
import { Link, useNavigate, useOutletContext } from "react-router"
import { FieldErrors } from "../components/FieldErrors"
import page from "../styles/page.module.css"
import form from "../styles/form.module.css"

export function Register() {
    const {setToken} = useOutletContext()
    const navigate = useNavigate()

    const [firstname,  setFirstname] = useState("")
    const [lastname,  setLastname] = useState("")
    const [email,  setEmail] = useState("")
    const [password,  setPassword] = useState("")
    const [confirmPassword,  setConfirmPassword] = useState("")
    const [error, setError] = useState(null)

    function storeValue(setValue, e) {
        setValue(e.target.value) 
    }

    function submitRegister(e) {
        e.preventDefault()
        const body = {firstname, lastname, email, password, confirmPassword}
        setError(null)
        async function fetchToken(body) {
            try {
                const data = await apiFetch("/auth/register", "POST", body)
                localStorage.setItem("token", data.token)
                setToken(data.token)
                navigate('/')
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        fetchToken(body)
    }


    return (
        <div className={form.page}>
        <h1 className={page.heading}>Create an account</h1>
        <p className={page.lede}>Already have one? <Link to="/login">Log in</Link></p>
        {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}
        <form className={form.form} onSubmit={submitRegister}>
            <div className={form.row}>
                <div>
                    <label htmlFor="firstname">First name</label>
                    <input type="text" name="firstname" id="firstname" autoComplete="given-name" onChange={(e)=> storeValue(setFirstname, e)} value={firstname} />
                    <FieldErrors error={error} field={"firstname"}/>
                </div>
                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" name="lastname" id="lastname" autoComplete="family-name" onChange={(e)=> storeValue(setLastname, e)} value={lastname}/>
                    <FieldErrors error={error} field={"lastname"}/>
                </div>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="email" onChange={(e)=> storeValue(setEmail, e)} value={email}/>
                <FieldErrors error={error} field={"email"}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" autoComplete="new-password" onChange={(e)=> storeValue(setPassword, e)} value={password}/>
                <FieldErrors error={error} field={"password"}/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="new-password" onChange={(e)=> storeValue(setConfirmPassword, e)} value={confirmPassword}/>
                <FieldErrors error={error} field={"confirmPassword"}/>
            </div>

            <button type="submit" className={form.submit}>Create account</button>
        </form>
        </div>
    )
}
