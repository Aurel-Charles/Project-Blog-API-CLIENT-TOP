export function formatDate(rawDate, format="long") {
    if (format === "short") {
        return new Date(rawDate).toLocaleDateString("en-US", { day: "numeric", month: "numeric", year: "numeric" })
    }
    return new Date(rawDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
}