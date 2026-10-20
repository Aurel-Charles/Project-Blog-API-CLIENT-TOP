import { useState } from "react"
import { apiFetch } from "../../api/api"
import { formatDate } from "../../utils/formatDate"
import { LoaderPinwheel, Pencil, Trash2 } from "lucide-react"
import { FieldErrors } from "../FieldErrors"
import page from "../../styles/page.module.css"
import styles from "./SingleComment.module.css"

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
            console.error(error);
            setError(error)
        }
        finally{
            setIsSaving(false)
        }
    }

    if (isEditing) {
        return (
            <li className={`${styles.comment} ${styles.editing}`}>
                {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}
                {isSaving ?
                    <button className={styles.saving} disabled>
                        <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                        Saving…
                    </button> :
                    <>
                    <label htmlFor={`edit-${comment.id}`}>Edit your comment</label>
                    <textarea name="content" id={`edit-${comment.id}`} value={draft} onChange={(e)=>storeValue(setDraft, e)}></textarea>
                    <FieldErrors error={error} field={"content"}/>
                    <div className={styles.editActions}>
                        <button onClick={()=> saveEdit()}>Save</button>
                        <button className={styles.secondary} onClick={()=> cancelEdit()}>Cancel</button>
                    </div>
                    </>
                }
            </li>
        )
    }
    return (
    <li className={styles.comment}>
        <div className={styles.header}>
            <span className={styles.name}>{comment.name}</span>
            <time className={styles.date} dateTime={comment.createdAt}>{formatDate(comment.createdAt, "short")}</time>
        </div>
        <p className={styles.content}>{comment.content}</p>
        
        {canManage(comment) && (
            <div className={styles.actions}>
                <button className={styles.quiet} onClick={()=> (setIsEditing(true)) } >
                    <Pencil size={14} aria-hidden="true" />
                    Edit
                </button>
                <button className={`${styles.quiet} ${styles.danger}`} onClick={()=> deleteComment(comment.id)}>
                    <Trash2 size={14} aria-hidden="true" />
                    Delete
                </button>
            </div>
            )
        }
    </li>
    )
}
