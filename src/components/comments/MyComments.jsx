import { useEffect, useState } from "react"
import { apiFetch } from "../../api/api"
import styles from "./Comments.module.css"
import page from "../../styles/page.module.css"
import { Loader } from "../Loader"
import { MySingleComment } from "./MySingleComment"

export function MyComments() {
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)
    const [deleteError, setDeleteError] = useState(null)


    useEffect(()=> {
        async function getComments() {
            try {
                const data = await apiFetch(`/auth/me/comments`)
                setComments(data)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        getComments()
        },
    [] 
)

async function deleteComment(comment) {
    setDeleteError(null)  
    try {
        await apiFetch(`/posts/${comment.post.id}/comments/${comment.id}`, "DELETE")
        setComments((prev) => prev.filter((c) => c.id !== comment.id))
    } catch (error) {
        console.error(error)
        setDeleteError(error)  
    }
}

let commentsSection

if (error) {
    commentsSection = <p className={`${page.error} ${styles.empty}`}>{error.message}</p>
}
else if (comments === null) {
    commentsSection = <Loader size={22} />
}
else if (comments.length === 0 ) {
    commentsSection = <p className={`${page.status} ${styles.empty}`}>No comments yet.</p>
}
else {
    commentsSection = (
        <>
        {deleteError && <p className={page.error} role="alert">{deleteError.message}</p>}

        <ol className={styles.list}>
        {comments.map((comment)=> (
            <MySingleComment key={comment.id} comment={comment} deleteComment={deleteComment} />
        ) )}
        </ol>
        </>
    )
}


return (
    <section className={styles.section}>
        <h2 className={styles.heading}>
           All my comments {comments?.length > 0 && <span className={styles.count}>({comments.length})</span>}
        </h2>
        {commentsSection}
    </section>
)
}