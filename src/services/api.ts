const API_BASE = 'http://localhost:5267/api' // reminder to change when working with VM

const ACCESS_KEY = 'blogapp_access'
const REFRESH_KEY = 'blogapp_refresh'

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

let refreshPromise: Promise<boolean> | null = null

async function refreshTokens(): Promise<boolean> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const refresh = getRefreshToken()
    if (!refresh) return false

    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ refreshToken: refresh }),
      })

      if (!res.ok) return false

      const data = await res.json()
      const access = data?.accessToken ?? data?.AccessToken
      const newRefresh = data?.refreshToken ?? data?.RefreshToken

      if (access && newRefresh) {
        console.log('Tokens refreshed successfully')
        setTokens(access, newRefresh)
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to refresh tokens', err)
      return false
    }
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = path.startsWith('http') ? path : `${API_BASE}/${path.replace(/^\//, '')}`

  const headers = new Headers(options?.headers as HeadersInit)
  headers.set('Accept', 'application/json')

  const access = getAccessToken()
  if (access) headers.set('Authorization', `Bearer ${access}`)

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    const refreshed = await refreshTokens()
    if (refreshed) {
      headers.set('Authorization', `Bearer ${getAccessToken()!}`)
      return fetch(url, { ...options, headers })
    }
  }

  return res
}

export default apiFetch