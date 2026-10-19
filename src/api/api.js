const base_URL= import.meta.env.VITE_API_URL

export async function apiFetch(path, method = "GET", body) {
        const res = await fetch(base_URL+path, {
            method: method,
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        })
        if (!res.ok) {
            const errorbody = await res.json() 
            throw new Error(`HTTP error ${res.status} : ${errorbody.error}`) 
        }
        const data = await res.json()
        return data
}