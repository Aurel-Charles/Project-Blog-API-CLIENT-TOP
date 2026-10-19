import { useEffect, useState } from "react";

import { apiFetch } from "../api/api";
import { Comments } from "../components/comments/Comments";

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
      lastPostSection = <p>{error.message}</p>
    } else if (lastPost === null) {
      lastPostSection = <p>Loading…</p>
    } else if (lastPost === undefined) {
      lastPostSection = <p>Aucun article publié pour l'instant.</p>
    } else {
      lastPostSection = (
        <article>
          <div>
            <h3> {lastPost.title} </h3>
            <p> {lastPost.content} </p>
            <p> {lastPost.author.firstname} </p>
            <p> {lastPost.author.lastname} </p>
          </div>
          <Comments postId={lastPost.id} />
        </article>
      )
    }
    
    return (
      <>
        <section>{/* ta présentation du projet */}</section>
        {lastPostSection}
      </>
    )
}