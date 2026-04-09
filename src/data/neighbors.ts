export interface Neighbor {
  id: string
  name: string
  distance: string
  sharedTools: number
  phone?: string
}

export interface ConnectionRequest {
  id: string
  name: string
  distance: string
}

export const pendingRequests: ConnectionRequest[] = [
  { id: 'r1', name: 'Emily Johnson', distance: '0.4 miles away' },
  { id: 'r2', name: 'Robert Brown', distance: '0.6 miles away' },
]

export const connectedNeighbors: Neighbor[] = [
  { id: 'n1', name: 'Mike Johnson', distance: '0.3 miles away', sharedTools: 12, phone: '(555) 123-4567' },
  { id: 'n2', name: 'Sarah Williams', distance: '0.5 miles away', sharedTools: 8, phone: '(555) 987-6543' },
  { id: 'n3', name: 'David Lee', distance: '0.7 miles away', sharedTools: 15 },
]

export interface SearchResult {
  id: string
  type: 'neighbor' | 'rental'
  toolName: string
  ownerOrStore: string
  distance: string
  status?: 'available' | 'on-loan'
  availableDate?: string
  phone?: string
  price?: string
}

export const searchResults: SearchResult[] = [
  {
    id: 's1',
    type: 'neighbor',
    toolName: 'DeWalt Hammer Drill',
    ownerOrStore: 'Mike Johnson',
    distance: '0.3 miles away',
    status: 'available',
    phone: '(555) 123-4567',
  },
  {
    id: 's2',
    type: 'neighbor',
    toolName: 'Makita Rotary Hammer',
    ownerOrStore: 'Sarah Williams',
    distance: '0.5 miles away',
    status: 'on-loan',
    availableDate: 'Jan 15, 2026',
    phone: '(555) 987-6543',
  },
  {
    id: 's3',
    type: 'rental',
    toolName: 'Home Depot Tool Rental',
    ownerOrStore: '2.1 miles away',
    distance: '2.1 miles away',
    price: '$45/day • $180/week',
  },
  {
    id: 's4',
    type: 'rental',
    toolName: 'Community Tool Library',
    ownerOrStore: '1.3 miles away',
    distance: '1.3 miles away',
    price: 'Free with membership ($50/year)',
  },
]
