import { Link } from "react-router";
import page from "../styles/page.module.css"

export function NotFound() {
    return(
        <>
        <h1 className={page.heading}>Page not found</h1>
        <p className={page.lede}>This address doesn't exist.</p>
        <Link to="/">Back to home</Link>
        </>
    )
}
