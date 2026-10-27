import { useOutletContext } from "react-router"
import { Loader } from "../components/Loader"
import { MembersOnly } from "../components/MembersOnly"
import page from "../styles/page.module.css"
import styles from "./Docs.module.css"
import { useEffect, useState } from "react"
import { apiFetch } from "../api/api"
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm"
import { slugify } from "../utils/slugify"

export function Docs() {
    const {token , user} = useOutletContext()
    const [error, setError] = useState(null)
    const [docs , setDocs] = useState(null)

    useEffect(()=> {
        if (!token) {
            return
        }
        async function getDocs() {
            try {
                const data = await apiFetch('/docs')

                setDocs(data.content)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        getDocs()
    },[token]
)



    if (!token) {
        return <MembersOnly message="Create a free account or log in to read the API documentation." />
    }

    if (!user) {
        return (
            <Loader size={22} />
        )
    }

    if (error) return <p className={page.error} role="alert">{error.message}</p>
    if (docs === null ){ return <Loader size={22} /> }


    // Les titres ## du README, pour le menu latéral
    const headings = docs.split("\n").filter((row)=> row.startsWith("## ") ).map((title) => title.slice(3))

    return(
        <div className={styles.layout}>
            <nav className={styles.toc} aria-label="On this page">
                <p className={styles.tocTitle}>On this page</p>
                <ul>
                    {headings.map((heading) => (
                    <li key={heading}>
                        <a href={`#${slugify(heading)}`}>{heading}</a>
                    </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.docs}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
                    }}
                    >
                    {docs}
                </ReactMarkdown>
            </div>
        </div>
    )
}