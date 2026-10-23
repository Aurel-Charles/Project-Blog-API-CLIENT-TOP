import DOMPurify from "dompurify";

export function purifyInnerHtml(content) {
    const sanitizedHtml =  DOMPurify.sanitize(content)
    return { __html: sanitizedHtml }
}