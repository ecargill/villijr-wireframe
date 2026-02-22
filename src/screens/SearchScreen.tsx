import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import Badge from '../components/ui/Badge'
import { searchResults } from '../data/neighbors'

export default function SearchScreen() {
  const [query, setQuery] = useState('Hammer Drill')

  const villij = searchResults.filter((r) => r.type === 'neighbor')
  const rentals = searchResults.filter((r) => r.type === 'rental')

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Find a Tool</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search for tools..." />

        {/* Villij results */}
        <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted">In Your Villij</h3>

        {villij.map((result) => (
          <div key={result.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-content">{result.toolName}</h3>
                <p className="text-sm text-content-muted font-medium">{result.ownerOrStore}</p>
              </div>
              {result.status && (
                <Badge variant={result.status === 'available' ? 'available' : 'on-loan'}>
                  {result.status === 'available' ? 'Available' : 'On Loan'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-content-muted mb-3">
              📍 {result.distance} {result.phone && `• 📞 ${result.phone}`}
            </p>
            {result.availableDate && (
              <p className="text-sm font-semibold text-secondary mb-3">
                Available again on {result.availableDate}
              </p>
            )}
            {result.status === 'available' && (
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold">
                  📱 Send SMS
                </button>
                <button className="flex-1 py-2.5 rounded-lg border-2 border-primary text-primary text-sm font-semibold">
                  👤 View Profile
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Rentals */}
        <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted mt-4">
          Local Rentals & Stores
        </h3>

        {rentals.map((result) => (
          <div key={result.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-content mb-1">{result.toolName}</h3>
            <p className="text-sm text-content-muted font-medium mb-3">{result.ownerOrStore}</p>
            {result.price && (
              <p className="text-sm font-semibold text-content mb-3">💰 {result.price}</p>
            )}
            <button className="w-full py-2.5 rounded-lg border-2 border-border text-content text-sm font-semibold">
              🌐 View Website
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
