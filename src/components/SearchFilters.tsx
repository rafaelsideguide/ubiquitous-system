interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function SearchFilters({ searchQuery, onSearchChange }: SearchFiltersProps) {
  return (
    <div className="flex items-center space-x-6 mb-8">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 !focus:border-orange-400 focus:ring-2 focus:ring-orange-100 font-mono"
        />
        <svg className="absolute left-4 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}
