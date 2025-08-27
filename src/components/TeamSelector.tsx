interface TeamSelectorProps {
  selectedTeam: string
  onTeamChange: (team: string) => void
  showDropdown: boolean
  onToggleDropdown: () => void
}

export function TeamSelector({ 
  selectedTeam, 
  onTeamChange, 
  showDropdown, 
  onToggleDropdown 
}: TeamSelectorProps) {
  return (
    <div className="relative team-dropdown">
      <button 
        onClick={onToggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">{selectedTeam}</span>
        </div>
                        <span className="text-sm text-gray-700 font-mono">Team {selectedTeam}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showDropdown && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={() => {
              onTeamChange('A')
            }}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              selectedTeam === 'A' ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
                                    <span className="font-mono">Team A</span>
            </div>
          </button>
          <button
            onClick={() => {
              onTeamChange('B')
            }}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              selectedTeam === 'B' ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">B</span>
              </div>
                                    <span className="font-mono">Team B</span>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
