import { useEffect, useState } from "react"
import { apiFetch } from "../../api/api";
import { CommentForm } from "./CommentForm";
import { useOutletContext } from "react-router";
import { SingleComment } from "./SingleComment";

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
        commentsSection = <p> {error.message} </p>
    }
    else if (comments === null) {
        commentsSection = <p> Loading ... </p>
    }
    else if (comments.length === 0 ) {
        commentsSection =  <p> No comment yet </p>
    }
    else {
        commentsSection = (
            <div>
            {deleteError && <p>{deleteError.message}</p>}

            {comments.map((comment)=> (
                <SingleComment 
                    key={comment.id} 
                    comment={comment} 
                    postId={postId} 
                    canManage={canManage} 
                    deleteComment={deleteComment} 
                    updateComments={updateComments} />
            ) )}
        </div>
        )
    }

    return (
        <div>
            <h3>Comments of the {postId} post </h3>
            {commentsSection}
            <CommentForm postId={postId} addComment={addComment}/>
        </div>
    )
}