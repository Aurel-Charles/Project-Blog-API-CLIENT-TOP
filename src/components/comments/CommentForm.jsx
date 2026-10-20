import { useState } from "react"
import { useOutletContext } from "react-router"
import { apiFetch } from "../../api/api"
import { FieldErrors } from "../FieldErrors"
import page from "../../styles/page.module.css"
import form from "../../styles/form.module.css"
import styles from "./CommentForm.module.css"

export function CommentForm({postId, addComment}) {
    const {token, user} = useOutletContext()
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)

    function storeValue(setValue, e) {
        setValue(e.target.value) 
    }

    function submitComment(e) {
        e.preventDefault()
        const body = {name, content}
        setError(null)
        async function postComment(body) {
            try {
                const data = await apiFetch(`/posts/${postId}/comments`, "POST", body)
                setName("")
                setContent("")
                addComment(data)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        postComment(body)
    }

    return(
        <form className={styles.form} onSubmit={submitComment}>
            <h3 className={styles.heading}>Leave a comment</h3>
            {user && <p className={styles.hint}>Commenting as {user.firstname} {user.lastname[0]}.</p>}
            {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}

            {!token && 
                <div> 
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" autoComplete="name" onChange={(e)=> storeValue(setName, e)} value={name} /> 
                <FieldErrors error={error} field={"name"}/>
                </div>
            }

            <div>
            <label htmlFor="content">Comment</label>
            <textarea name="content" id="content" onChange={(e)=> storeValue(setContent, e)} value={content}>
            </textarea> 
            <FieldErrors error={error} field={"content"}/>
            </div>

            <button type="submit" className={form.submit}>Post comment</button>
        </form>
    )
}
