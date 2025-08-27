import { LogsResponse, FetchLogsParams } from '@/types/logs'

const API_BASE_URL = 'https://urban-octo-happiness.vercel.app/api'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchLogs(params: FetchLogsParams): Promise<LogsResponse> {
  // tip: something maybe wrong here
  const searchParams = new URLSearchParams({
    customer_id: params.customer_id,
    page: params.page.toString(),
    q: params.q
  })

  const response = await fetch(`${API_BASE_URL}/events?${searchParams}`)

  if (response.status === 504) {
    throw new ApiError('Request timeout - try reducing the result set size', 504)
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.error || `HTTP error! status: ${response.status}`,
      response.status,
      errorData
    )
  }

  return response.json()
}
