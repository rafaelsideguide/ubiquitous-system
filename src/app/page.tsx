'use client'

import { useState, useEffect } from 'react'
import { useLogs } from '@/hooks/useLogs'
import { LogsTable } from '@/components/LogsTable'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { SearchFilters } from '@/components/SearchFilters'
import { Pagination } from '@/components/Pagination'

export default function ActivityLogs() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('B') // Default to Team B
  const [showTeamDropdown, setShowTeamDropdown] = useState(false)

  const { logs, loading, error } = useLogs({
    customerId: selectedTeam,
    page,
    searchQuery
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.team-dropdown')) {
        setShowTeamDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])



    return (
    <div className="min-h-screen bg-white">
      <Header
        selectedTeam={selectedTeam}
        showTeamDropdown={showTeamDropdown}
        onTeamChange={(team) => {
          setSelectedTeam(team)
          setShowTeamDropdown(false)
        }}
        onToggleDropdown={() => setShowTeamDropdown(!showTeamDropdown)}
      />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-12 relative bg-gray-25" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }}>
          <div className="mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight font-mono">Activity Logs</h1>
            <p className="text-gray-500 font-light font-mono">Take a look at your requests activity</p>
          </div>

          <SearchFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <LogsTable logs={logs} loading={loading} />

          <Pagination
            page={page}
            logsLength={logs.length}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  )
}
