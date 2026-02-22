import { useState, useRef, useEffect } from 'react'
import Card from '../components/ui/Card'

type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance' | 'add-tool'

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void
}

const cards = [
  { icon: '🔍', title: 'Find a Tool', description: 'Search tools available in your Vilij', screen: 'search' as Screen },
  { icon: '🔧', title: 'Maintenance', description: '3 tools need attention', screen: 'maintenance' as Screen, badge: 3 },
  { icon: '📦', title: 'My Tools', description: 'Manage your tool inventory', screen: 'tools' as Screen },
  { icon: '👥', title: 'My Vilij', description: 'Connect with tool-sharing neighbors', screen: 'villij' as Screen },
  { icon: '🆕', title: 'Start a Vilij', description: 'Create your own tool-sharing circle', screen: null },
]

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Vilijr</h1>

        {/* Gear + dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors"
          >
            ⚙️
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-border">
              <button
                onClick={() => { setMenuOpen(false); onNavigate('login') }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-danger hover:bg-red-50 transition-colors"
              >
                <span className="text-base">🚪</span>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-surface">
        {/* Welcome banner */}
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-1">Welcome back, John! 👋</h2>
          <p className="text-sm opacity-90">You have 3 tools on loan and 2 pending requests</p>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Card
              key={card.title}
              onClick={card.screen ? () => onNavigate(card.screen!) : undefined}
              className="relative"
            >
              {card.badge && (
                <span className="absolute top-4 right-4 bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              )}
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-lg font-bold text-content">{card.title}</div>
              <div className="text-sm text-content-muted">{card.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
