export interface LogEntry {
  id: string
  url: string
  status: 'error' | 'ok'
}

export interface LogsResponse {
  items: LogEntry[]
  next?: string
  total_estimate: number
}

export interface FetchLogsParams {
  customer_id: string
  page: number
  q: string
}
