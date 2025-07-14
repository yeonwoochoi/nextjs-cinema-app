import { cache } from 'react'

type FetchOptions = RequestInit & {
  cache?: 'force-cache' | 'no-store'
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

class ApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl
  }

  async fetchApi<T>(url: string, options: FetchOptions = {}): Promise<ApiResult<T | null>> {
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

      // 빈 Body 체크
      const text = await response.text();
      if (!text) {
        return { status: 'success', data: null };
      }
      else {
        const data = JSON.parse(text);
        return { status: 'success', data };
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Fetch error';
      return { status: 'error', error };
    }
  }

  // force-cache (기본값)
  cachedFetch = cache(
    async <T>(url: string, options: Omit<FetchOptions, 'cache'> = {}): Promise<ApiResult<T | null>> => {
      return this.fetchApi<T>(url, { ...options, cache: 'force-cache' })
    }
  )

  // no-store (항상 새 데이터)
  // 그래서 caching 안함.
  dynamicFetch = async <T>(url: string, options: Omit<FetchOptions, 'cache'> = {}): Promise<ApiResult<T | null>> => {
    return this.fetchApi<T>(url, { ...options, cache: 'no-store' })
  }

  // ISR (재검증 주기 설정)
  revalidatingFetch = cache(
    async <T>(url: string, revalidateSeconds: number, options: Omit<FetchOptions, 'next'> = {}): Promise<ApiResult<T | null>> => {
      return this.fetchApi<T>(url, { ...options, next: { revalidate: revalidateSeconds } })
    }
  )

  // 태그 기반 캐시
  // unstable_cache를 쓰던지 기본 fetch 쓰던지
  // unstable_cache는 말 그대로 아직 안정화되지 않아서 fetch 쓰는게 나을듯.
  taggedFetch = async <T>(url: string, tags: string[], options: Omit<FetchOptions, 'next'> = {}): Promise<ApiResult<T | null>> => {
    return this.fetchApi<T>(url, { ...options, next: { tags }, })
  }
}

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL)

// 직접 클라이언트 생성할 수도 있어서 (다른 base URL 사용 시)
export default apiClient

export const fetchApi  = apiClient.fetchApi.bind(apiClient)

export const {
  cachedFetch,
  dynamicFetch,
  revalidatingFetch,
  taggedFetch
} = apiClient