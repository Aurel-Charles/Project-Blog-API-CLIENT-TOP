import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiFetch } from "../api/api";
import { Comments } from "../components/comments/Comments";
import { formatDate } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import article from "../styles/article.module.css"
import styles from "./Home.module.css"

export function Home() {
    const [lastPost, setLastPost] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(()=> {
            async function getLastPost() {
                try {
                    const data = await apiFetch(`/posts`)
                    setLastPost(data[0])
                } catch (error) {
                    console.error(error)
                    setError(error)
                }
            }
            getLastPost()
            },
        []
    )

    let lastPostSection

    if (error) {
      lastPostSection = <p className={page.error}>{error.message}</p>
    } else if (lastPost === null) {
      lastPostSection = <Loader />
    } else if (lastPost === undefined) {
      lastPostSection = <p className={page.status}>No posts published yet.</p>
    } else {
      lastPostSection = (
        <article>
          <h2 className={article.title}>
            <Link to={`/posts/${lastPost.id}`} className={article.titleLink}>{lastPost.title}</Link>
          </h2>
          <div className={article.meta}>
            <span>By {lastPost.author.firstname} {lastPost.author.lastname}</span>
            <span>Published <time dateTime={lastPost.publishedAt}>{formatDate(lastPost.publishedAt)}</time></span>
          </div>
          <div className={article.body}>{lastPost.content}</div>
          <Comments postId={lastPost.id} />
        </article>
      )
    }
    
    return (
      <>
        <section className={styles.intro}>
          <h1 className={page.heading}>Notes from The Odin Project</h1>
          <p className={page.lede}>
            I'm Aurel, a web developer working through the Full Stack JavaScript path.
            This is where I write up what I learn along the way: the projects, the bugs,
            and the things that finally clicked.
          </p>
          <Link to="/posts">Browse all posts</Link>
        </section>

        <section>
          <p className={styles.label}>Latest post</p>
          {lastPostSection}
        </section>
      </>
    )
}
