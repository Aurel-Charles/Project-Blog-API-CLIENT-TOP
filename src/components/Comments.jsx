import { useEffect, useState } from "react"
import { apiFetch } from "../api/api";
import { CommentForm } from "./CommentForm";

export function Comments({postId}) {
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)

    function addComment(comment) {
        setComments((prevComments)=> [...prevComments, comment])
    }

    useEffect(()=> {
            console.log("fetching comments");
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

    console.log(comments);
    
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
            {comments.map((comment)=> (
                <div key={comment.id}>
                    <p> {comment.name} </p>
                    <p> {comment.content} </p>
                    <p> {new Date(comment.createdAt).toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" })} </p>
                </div>
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