export function htmlToText(html) {
    const spaced = html.replace(/<\/(p|h2|h3|li|blockquote|pre)>/g, "$& ")
    const doc = new DOMParser().parseFromString(spaced, "text/html")
    const text = doc.body.textContent.trim()
    return text
}