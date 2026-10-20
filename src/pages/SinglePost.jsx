import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { ArrowLeft } from "lucide-react";
import { Comments } from "../components/comments/Comments";
import { apiFetch } from "../api/api";
import { formatDate } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import article from "../styles/article.module.css"

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
                console.error(error);
                setError(error)
            }
        }
        getPost()
        },
        [postId]
    )

    if (error) return <p className={page.error}>{error.message}</p>
    if (post === null) return <Loader />

    return (
        <>
        <article>
            <Link to="/posts" className={article.back}>
                <ArrowLeft size={16} aria-hidden="true" />
                All posts
            </Link>
            <h1 className={article.title}>{post.title}</h1>
            <div className={article.meta}>
                <span>By {post.author.firstname} {post.author.lastname}</span>
                <span>Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>
                {formatDate(post.updatedAt) !== formatDate(post.publishedAt) &&
                    <span>Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>}
            </div>
            <div className={article.body}>{post.content}</div>
        </article>

        <Comments postId={postId}/>
        </>
    )
}
