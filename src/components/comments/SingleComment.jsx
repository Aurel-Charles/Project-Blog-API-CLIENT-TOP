export function SingleComment({comment, canManage, deleteComment}) {
    return (
    <div>
        <p> {comment.name} </p>
        <p> {comment.content} </p>
        <p> {new Date(comment.createdAt).toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" })} </p>
        
        {canManage(comment) && (
            <div>
                <button>Edit</button>
                <button onClick={()=> deleteComment(comment.id)}>Delete</button>
            </div>
            )
        }

    </div>
    )
}