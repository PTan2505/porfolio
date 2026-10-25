// Prefix a file from public/ with the deploy base path ("/" in dev, "/porfolio/" on GitHub Pages).
export const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
