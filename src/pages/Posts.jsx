import { useEffect, useState } from "react"
import { Link } from "react-router";
import { apiFetch } from "../api/api";
import { truncate } from "../utils/truncate";
import { formatDate } from "../utils/formatDate";

export function Posts() {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    useEffect(()=> {
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
                    <p> {truncate(post.content, 150)} </p>
                    <p>By {post.author.firstname} {post.author.lastname}</p>
                    <p>Published: {formatDate(post.publishedAt, "short")} </p>
                </div>
            ) )}
        </div>
        </>
    )
}