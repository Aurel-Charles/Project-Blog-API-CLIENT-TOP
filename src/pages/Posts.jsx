import { useEffect, useState } from "react"
import { Link } from "react-router";
import { apiFetch } from "../api/api";
import { truncate } from "../utils/truncate";
import { formatDate } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import styles from "./Posts.module.css"

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

    if (error) return <p className={page.error}>{error.message}</p>
    if (posts === null) return <Loader />

    return (
        <>
        <h1 className={page.heading}>Posts</h1>
        {posts.length === 0 ?
            <p className={page.status}>No posts published yet.</p>
        :
            <ol className={styles.list}>
                {posts.map((post)=> (
                    <li key={post.id} className={styles.item}>
                        <time className={styles.date} dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt, "medium")}
                        </time>
                        <div>
                            <h2 className={styles.title}>
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className={styles.excerpt}>{truncate(post.content, 160)}</p>
                            <p className={styles.author}>By {post.author.firstname} {post.author.lastname}</p>
                        </div>
                    </li>
                ) )}
            </ol>
        }
        </>
    )
}
