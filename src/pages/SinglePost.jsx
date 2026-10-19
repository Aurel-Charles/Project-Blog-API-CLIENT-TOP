import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Comments } from "../components/Comments";
import { apiFetch } from "../api/api";

export function SinglePost() {
    const [post, setPost] = useState(null)


    const [error, setError] = useState(null)

    let params = useParams()
    let postId = params.postId

    useEffect(()=>{
        // fetch
        console.log("fetching Single Post");
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
            <p> {post.author.firstname} </p>
            <p> {post.author.lastname} </p>
        </div>

        <Comments postId={postId}/>
        </>
    )
}