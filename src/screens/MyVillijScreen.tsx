import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import { pendingRequests, connectedNeighbors } from '../data/neighbors'
import type { ConnectionRequest } from '../data/neighbors'

export default function MyVillijScreen() {
  const [query, setQuery] = useState('')
  const [pending, setPending] = useState<ConnectionRequest[]>(pendingRequests)

  const accept = (id: string) => setPending((p) => p.filter((r) => r.id !== id))
  const decline = (id: string) => setPending((p) => p.filter((r) => r.id !== id))

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">My Villij</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search for people..." />

        {/* Pending */}
        {pending.length > 0 && (
          <>
            <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted mt-2">
              Pending Requests ({pending.length})
            </h3>
            {pending.map((req) => (
              <div key={req.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={req.name} />
                  <div>
                    <h4 className="font-bold text-content">{req.name}</h4>
                    <p className="text-sm text-content-muted">{req.distance}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => accept(req.id)}
                    className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold"
                  >
                    ✓ Accept
                  </button>
                  <button
                    onClick={() => decline(req.id)}
                    className="flex-1 py-2.5 rounded-lg border-2 border-border text-content text-sm font-semibold"
                  >
                    ✗ Decline
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Connected */}
        <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted mt-4">
          Connected ({connectedNeighbors.length})
        </h3>
        {connectedNeighbors.map((neighbor) => (
          <div key={neighbor.id} className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Avatar name={neighbor.name} />
              <div>
                <h4 className="font-bold text-content">{neighbor.name}</h4>
                <p className="text-sm text-content-muted">
                  {neighbor.distance} • {neighbor.sharedTools} shared tools
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-2">
          <Button>+ Add Someone to My Villij</Button>
        </div>
      </div>
    </div>
  )
}
