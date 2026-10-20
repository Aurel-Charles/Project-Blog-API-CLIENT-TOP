import { useState } from "react"
import { useOutletContext } from "react-router"
import { apiFetch } from "../../api/api"
import { FieldErrors } from "../FieldErrors"

export function CommentForm({postId, addComment}) {
    const {token} = useOutletContext()
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
        <form className="form-coment" onSubmit={submitComment}>
            {error && !error.errors && <p>{error.message}</p>}
            <p>Add a comment for the post {postId}</p>

            {!token && 
                <> 
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={(e)=> storeValue(setName, e)} value={name} /> 
                <FieldErrors error={error} field={"name"}/>
                </>
            }

            <label htmlFor="content">Comment:</label>
            <textarea name="content" id="content" onChange={(e)=> storeValue(setContent, e)} value={content}>
            </textarea> 
            <FieldErrors error={error} field={"content"}/>

            <button type="submit">Submit</button>
        </form>
    )
}