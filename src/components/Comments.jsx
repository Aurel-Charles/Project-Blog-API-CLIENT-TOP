import { useEffect, useState } from "react"
import { apiFetch } from "../api/api";

export function Comments({postId}) {
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)

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
    

    if (error) return <p> {error.message} </p>
    if (comments === null) return <p> Loading ... </p>
    if (comments.length === 0 ) return <p> No comment yet </p>

    return (
        <div>
            <h3>Comments of the {postId} post </h3>
            <div>
                {comments.map((comment)=> (
                    <div key={comment.id}>
                        <p> {comment.name} </p>
                        <p> {comment.content} </p>
                        <p> {new Date(comment.createdAt).toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" })} </p>
                    </div>
                ) )}
            </div>
        </div>
    )
}