import { useEffect, useState } from "react"
import { apiFetch } from "../../api/api";
import { CommentForm } from "./CommentForm";
import { useOutletContext } from "react-router";
import { SingleComment } from "./SingleComment";
import page from "../../styles/page.module.css"
import styles from "./Comments.module.css"

export function Comments({postId}) {
    const {user} = useOutletContext()
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)
    const [deleteError, setDeleteError] = useState(null)

    function addComment(comment) {
        setComments((prevComments)=> [...prevComments, comment])
    }

    useEffect(()=> {
            async function getComments() {
                try {
                    const data = await apiFetch(`/posts/${postId}/comments`)
                    setComments(data)
                } catch (error) {
                    console.error(error)
                    setError(error)
                }
            }
            getComments()
            },
        [postId]
    )

    function canManage(coment) {
        if (!user) return false
        if (user.role === "ADMIN") return true
        return (coment.authorId === user.id)
    }

    async function deleteComment(commentId) {
        try {
            await apiFetch(`/posts/${postId}/comments/${commentId}`, "DELETE")
            setComments((prev) => prev.filter((c) => c.id !== commentId))
        } catch (error) {
            console.error(error)
            setDeleteError(error)  
        }
    }
    
    function updateComments(updatedComment) {
        setComments((prev)=> prev.map((c)=> (c.id === updatedComment.id ? updatedComment : c)))
    }


    let commentsSection

    if (error) {
        commentsSection = <p className={`${page.error} ${styles.empty}`}>{error.message}</p>
    }
    else if (comments === null) {
        commentsSection = <p className={`${page.status} ${styles.empty}`}>Loading…</p>
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
                <SingleComment 
                    key={comment.id} 
                    comment={comment} 
                    postId={postId} 
                    canManage={canManage} 
                    deleteComment={deleteComment} 
                    updateComments={updateComments} />
            ) )}
            </ol>
            </>
        )
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>
                Comments {comments?.length > 0 && <span className={styles.count}>({comments.length})</span>}
            </h2>
            {commentsSection}
            <CommentForm postId={postId} addComment={addComment}/>
        </section>
    )
}
