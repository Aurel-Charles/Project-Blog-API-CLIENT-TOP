import { Link } from "react-router";

export function NotFound() {
    return(
        <>
        <p>Page Not Found</p>
        <Link to="/">Back to home</Link>
        </>
    )
}