import { useState, useEffect, useCallback } from 'react'
import { LogEntry } from '@/types/logs'
import { fetchLogs, ApiError } from '@/lib/api'

interface UseLogsParams {
  customerId: string
  page: number
  searchQuery: string
}

interface UseLogsReturn {
  logs: LogEntry[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useLogs({ customerId, page, searchQuery }: UseLogsParams): UseLogsReturn {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // tip: something maybe wrong here...
      const data = await fetchLogs({
        customer_id: customerId,
        page,
        q: searchQuery
      })
      
      setLogs(data.items || [])
    } catch (err) {
      if (err instanceof ApiError && err.status === 504) {
        setLogs([])
        setError('Request timeout - try reducing the result set size')
      } else {
        console.error('Failed to fetch logs:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, [customerId, page, searchQuery])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    logs,
    loading,
    error,
    refetch: fetchData
  }
}
