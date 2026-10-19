import { useState } from "react"
import { apiFetch } from "../../api/api"

export function SingleComment({comment,postId, canManage, deleteComment, updateComments}) {
    const [draft, setDraft] = useState(comment.content)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState(null)

    function storeValue(setValue, e) {
        setValue(e.target.value) 
    }

    function cancelEdit() {
        setError(null)
        setIsEditing(false)
        setDraft(comment.content)
    }

    async function saveEdit() {
        setError(null)
        setIsSaving(true)
        try {
            const body = {content : draft}
            const updatedComment = await apiFetch(`/posts/${postId}/comments/${comment.id}`, "PATCH", body)
            updateComments(updatedComment)
            setIsEditing(false)
        } catch (error) {
            console.log(error);
            setError(error)
        }
        finally{
            setIsSaving(false)
        }
    }

    if (isEditing) {
        return (
            <div>
                {error && <p>{error.message}</p>}
                {isSaving ?
                    <button disabled>Saving..</button> :
                    <>
                    <textarea name="content" id={`edit-${comment.id}`} value={draft} onChange={(e)=>storeValue(setDraft, e)}></textarea>
                    <button onClick={()=> saveEdit()}>Save</button>
                    <button onClick={()=> cancelEdit()}>Cancel</button>
                    </>
                }
            </div>
        )
    }
    return (
    <div>
        <p> {comment.name} </p>
        <p> {comment.content} </p>
        <p> {new Date(comment.createdAt).toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" })} </p>
        
        {canManage(comment) && (
            <div>
                <button onClick={()=> (setIsEditing(true)) } >Edit</button>
                <button onClick={()=> deleteComment(comment.id)}>Delete</button>
            </div>
            )
        }

    </div>
    )
}