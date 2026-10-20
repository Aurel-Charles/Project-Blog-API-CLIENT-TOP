import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Comments } from "../components/comments/Comments";
import { apiFetch } from "../api/api";
import { formatDate } from "../utils/formatDate";

export function SinglePost() {
    const [post, setPost] = useState(null)


    const [error, setError] = useState(null)

    let params = useParams()
    let postId = params.postId

    useEffect(()=>{
        async function getPost() {
            try {
                const data = await apiFetch(`/posts/${postId}`)
                setPost(data)
            } catch (error) {
                console.log(error);
                setError(error)
            }
        }
        getPost()
        },
        [postId]
    )

    if (error) return <p> {error.message} </p>
    if (post === null) return <p> Loading ... </p>
    
    
    return (
        <>
        <div>
            <p> {post.title} </p>
            <p> {post.content} </p>
            <p>By {post.author.firstname} {post.author.lastname}</p>
            <p>Published: {formatDate(post.publishedAt)} </p>
            {formatDate(post.updatedAt) !== formatDate(post.publishedAt) && <p>Updated: {formatDate(post.updatedAt)} </p> }
        </div>

        <Comments postId={postId}/>
        </>
    )
}