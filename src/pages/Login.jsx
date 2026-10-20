import { useState } from "react"
import { apiFetch } from "../api/api"
import { Link, useNavigate, useOutletContext } from "react-router"
import { FieldErrors } from "../components/FieldErrors"
import page from "../styles/page.module.css"
import form from "../styles/form.module.css"

export function Login() {
    const {setToken} = useOutletContext()
    const navigate = useNavigate()
    const [email,  setEmail] = useState("")
    const [password,  setPassword] = useState("")
    const [error, setError] = useState(null)


    function storeValue(setValue, e) {
        setValue(e.target.value) 
    }
    
    function submitLogin(e) {
        e.preventDefault()
        const body = {email, password}
        setError(null)
        async function fetchToken(body) {
            try {
                const data = await apiFetch(`/auth/login`, "POST", body)
                localStorage.setItem("token" , data.token)
                setToken(data.token)
                navigate("/")
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }

        fetchToken(body)
    }


   

    return (
        <div className={form.page}>
        <h1 className={page.heading}>Log in</h1>
        <p className={page.lede}>No account yet? <Link to="/register">Sign up</Link></p>
        {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}
        <form className={form.form} onSubmit={submitLogin}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="email" onChange={(e)=> storeValue(setEmail, e)} value={email}/>
                <FieldErrors error={error} field={"email"}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" autoComplete="current-password" onChange={(e)=> storeValue(setPassword, e)} value={password}/>
                <FieldErrors error={error} field={"password"}/>
            </div>

            <button type="submit" className={form.submit}>Log in</button>
        </form>
        </div>
    )
}
