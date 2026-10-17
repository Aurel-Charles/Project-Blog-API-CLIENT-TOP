import { useEffect, useState } from "react"

export function Posts() {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    useEffect(()=> {
            console.log("fetching posts");
            async function getPosts() {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`,)
                    if (!res.ok) {
                        const body = await res.json() 
                        throw new Error(`HTTP error ${res.status} : ${body.error}`) 
                    }
                    const data = await res.json()
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
                    <p> {post.title} </p>
                    <p> {post.content} </p>
                    <p> {post.author.firstname} </p>
                    <p> {post.author.lastname} </p>
                </div>
            ) )}
        </div>
        </>
    )
}