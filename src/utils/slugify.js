export function slugify(text) {
    const id = text.trim().toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9-]/g, "")
    return id
}