// True while the page is being captured into Figma by the Figma MCP (`#figmacapture=…` URLs, dev only).
export const isFigmaCapture = import.meta.env.DEV && window.location.hash.includes('figmacapture')
