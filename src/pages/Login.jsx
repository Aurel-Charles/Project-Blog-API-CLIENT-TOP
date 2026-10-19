import { useState } from "react"
import { apiFetch } from "../api/api"
import { useNavigate, useOutletContext } from "react-router"

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
        <>
        <h2>Login</h2>
        {error && `${error.message}` }
        <form onSubmit={submitLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e)=> storeValue(setEmail, e)} value={email}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=> storeValue(setPassword, e)} value={password}/>

            <button type="submit">Submit</button>
        </form>
        </>
    )
} 