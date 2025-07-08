import { cache } from 'react'

type FetchOptions = RequestInit & {
  cache?: 'force-cache' | 'no-store'
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

class ApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl
  }

  async fetchApi<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const fullUrl = this.baseUrl + url;

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers as Record<string, string>)
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (err) {
      console.error('Fetch error:', err)
      throw err
    }
  }

  // force-cache (기본값)
  cachedFetch = cache(
    async <T>(url: string, options: Omit<FetchOptions, 'cache'> = {}): Promise<T> => {
      return this.fetchApi<T>(url, { ...options, cache: 'force-cache' })
    }
  )

  // no-store (항상 새 데이터)
  // 그래서 caching 안함.
  dynamicFetch = async <T>(url: string, options: Omit<FetchOptions, 'cache'> = {}): Promise<T> => {
    return this.fetchApi<T>(url, { ...options, cache: 'no-store' })
  }

  // ISR (재검증 주기 설정)
  revalidatingFetch = cache(
    async <T>(url: string, revalidateSeconds: number, options: Omit<FetchOptions, 'next'> = {}): Promise<T> => {
      return this.fetchApi<T>(url, { ...options, next: { revalidate: revalidateSeconds } })
    }
  )

  // 태그 기반 캐시
  // unstable_cache를 쓰던지 기본 fetch 쓰던지
  // unstable_cache는 말 그대로 아직 안정화되지 않아서 fetch 쓰는게 나을듯.
  taggedFetch = async <T>(url: string, tags: string[], options: Omit<FetchOptions, 'next'> = {}): Promise<T> => {
    return this.fetchApi<T>(url, { ...options, next: { tags }, })
  }
}

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL)

// 직접 클라이언트 생성할 수도 있어서 (다른 base URL 사용 시)
export default apiClient

export const {
  fetchApi,
  cachedFetch,
  dynamicFetch,
  revalidatingFetch,
  taggedFetch
} = apiClient