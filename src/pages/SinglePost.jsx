import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Comments } from "../components/Comments";

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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`)
                if (!res.ok) {
                    const body = await res.json()
                    throw new Error(`HTTP error ${res.status} : ${body.error}`);
                }
                const data = await res.json()
                
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