import { useEffect } from 'react'
import { profile } from '@/data/site'

const BASE = `${profile.fullName} — ${profile.role}`

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.firstName} ${profile.lastName}` : BASE
  }, [title])
}
