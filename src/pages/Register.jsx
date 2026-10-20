import { useState } from "react"
import { apiFetch } from "../api/api"
import { useNavigate, useOutletContext } from "react-router"
import { FieldErrors } from "../components/FieldErrors"

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
        <>
        <h2>Register</h2>
        {error && !error.errors && <p>{error.message}</p>}
        <form onSubmit={submitRegister}>
            <label htmlFor="firstname">Firstname: </label>
            <input type="text" name="firstname" id="firstname" onChange={(e)=> storeValue(setFirstname, e)} value={firstname} />
            <FieldErrors error={error} field={"firstname"}/>
            <label htmlFor="lastname">Lastname: </label>
            <input type="text" name="lastname" id="lastname" onChange={(e)=> storeValue(setLastname, e)} value={lastname}/>
            <FieldErrors error={error} field={"lastname"}/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e)=> storeValue(setEmail, e)} value={email}/>
            <FieldErrors error={error} field={"email"}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=> storeValue(setPassword, e)} value={password}/>
            <FieldErrors error={error} field={"password"}/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=> storeValue(setConfirmPassword, e)} value={confirmPassword}/>
            <FieldErrors error={error} field={"confirmPassword"}/>


            <button type="submit">Submit</button>
        </form>
        </>
    )
} 