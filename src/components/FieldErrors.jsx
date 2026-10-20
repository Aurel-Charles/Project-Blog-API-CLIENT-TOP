import styles from "./FieldErrors.module.css"

export function FieldErrors({error, field}) {
    return(
        <>
        {error?.errors
            ?.filter((e) => e.path === field)
            .map((e) => <p key={e.msg} className={styles.error}>{e.msg}</p>)}
        </>
    )
}
