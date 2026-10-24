import { LoaderPinwheel, Trash2 } from "lucide-react";
import { ConfirmDialog } from "../ConfirmDialog";
import styles from "./SingleComment.module.css"
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router";

export function MySingleComment({comment , deleteComment}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)


    async function handleDelete() {
        setIsDeleting(true)
        setIsOpen(false)
        try {
            await deleteComment(comment)
        } finally{
            setIsDeleting(false)
        }
    }
    

    return (
        <li className={styles.comment}>
        <div className={styles.header}>
            <span className={styles.name}>
                on <Link to={`/posts/${comment.post.id}`}>{comment.post.title}</Link>
            </span>
            <time className={styles.date} dateTime={comment.createdAt}>{formatDate(comment.createdAt, "short")}</time>
        </div>
        <p className={styles.content}>{comment.content}</p>
        

            <div className={styles.actions}>
                <button type="button" disabled={isDeleting} className={`${styles.quiet} ${styles.danger}`} aria-label={`Delete your comment on ${comment.post.title}`} onClick={()=> setIsOpen(true)}>
                    {isDeleting ? 
                    <>
                    <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                    Deleting…
                    </>
                    :   
                    <>
                        <Trash2 size={14} aria-hidden="true" />
                        Delete
                    </>
                     }
                </button>
            </div>

        <ConfirmDialog isOpen={isOpen} message={`Delete your comment?`} onCancel={()=> setIsOpen(false)} onValidate={handleDelete}  />
    </li>
    )
}