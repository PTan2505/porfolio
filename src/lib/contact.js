// Contact form transport.
// TODO: wire a real provider (EmailJS, Web3Forms, Formspree or your own API).
// Keep the signature: resolve on success, throw an Error with a readable message on failure.
export async function sendContactMessage(values) {
  if (import.meta.env.DEV) console.info('[contact] would send:', values)
  await new Promise(resolve => setTimeout(resolve, 900))
  return { ok: true }
}
