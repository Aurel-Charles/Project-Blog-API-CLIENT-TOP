import { useState } from "react"

export function Rgister() {
    const [firstname,  setFirstname] = useState(null)
    const [lastname,  setLastname] = useState(null)
    const [email,  setEmail] = useState(null)
    const [password,  setPassword] = useState(null)
    const [confirmPassword,  setConfirmPassword] = useState(null)


    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    function storeValue(setValue, e) {
        setValue(e.target.value) 
    }
    
    return (
        <>
        <h2>Login</h2>
        <form>
            <label htmlFor="firstname">Firstname: </label>
            <input type="text" name="firstname" id="firstname" onChange={(e)=> storeValue(setFirstname, e)}/>
            <label htmlFor="lastname">Lastname: </label>
            <input type="text" name="lastname" id="lastname" onChange={(e)=> storeValue(setLastname, e)} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e)=> storeValue(setEmail, e)}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=> storeValue(setPassword, e)}/>
            <label htmlFor="password">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=> storeValue(setConfirmPassword, e)} />
        </form>
        </>
    )
} 