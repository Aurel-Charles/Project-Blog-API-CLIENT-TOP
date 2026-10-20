export function FieldErrors({error, field}) {
    return(
        <>
        {error?.errors
            ?.filter((e) => e.path === field)
            .map((e) => <p key={e.msg}>{e.msg}</p>)}
        </>
    )
}