import { motion } from 'framer-motion'
import { LogEntry } from '@/types/logs'

interface LogsTableProps {
  logs: LogEntry[]
  loading: boolean
}

export function LogsTable({ logs, loading }: LogsTableProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm overflow-hidden rounded-none border-0 shadow-none">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="px-0 py-4 text-left text-xs font-light text-gray-400 uppercase tracking-widest font-mono">URL</th>
            <th className="px-0 py-4 text-left text-xs font-light text-gray-400 uppercase tracking-widest font-mono">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // 🐛 BUG: Poor loading state - just shows "Loading..." instead of skeleton
            <tr>
              <td colSpan={2} className="px-0 py-8 text-center text-gray-400 font-light">
                Loading...
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-50 hover:bg-gray-25"
              >
                <td className="px-0 py-6 whitespace-nowrap text-sm text-gray-600 font-light font-mono">
                  {log.url}
                </td>
                <td className="px-0 py-6 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-light tracking-wide font-mono ${
                    log.status === 'ok'
                      ? 'text-green-600 bg-green-50/50' 
                      : 'text-red-600 bg-red-50/50'
                  }`}>
                    {log.status === 'ok' ? 'COMPLETED' : 'FAILED'}
                  </span>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
