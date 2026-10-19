import { useEffect, useState } from "react"
import { Link } from "react-router";
import { apiFetch } from "../api/api";

export function Posts() {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    useEffect(()=> {
            console.log("fetching posts");
            async function getPosts() {
                try {
                    const data = await apiFetch("/posts")
                    setPosts(data)
                } catch (error) {
                    console.error(error)
                    setError(error)
                }
            }
            getPosts()
            },
        []
    )

    if (error) return <p> {error.message} </p>
    if (posts === null) return <p> Loading ... </p>

    return (
        <>
        <div>
            {posts.map((post)=> (
                <div key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    <p> {post.content} </p>
                    <p> {post.author.firstname} </p>
                    <p> {post.author.lastname} </p>
                </div>
            ) )}
        </div>
        </>
    )
}