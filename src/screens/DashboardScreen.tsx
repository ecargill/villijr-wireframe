import Card from '../components/ui/Card'
import HamburgerMenu from '../components/ui/HamburgerMenu'

type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance' | 'add-tool'

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void
}

const cards = [
  { icon: '🔍', title: 'Find a Tool', description: 'Search tools available in your Vilij', screen: 'search' as Screen },
  { icon: '🔧', title: 'Maintenance', description: '3 tools need attention', screen: 'maintenance' as Screen, badge: 3 },
  { icon: '📦', title: 'My Tools', description: 'Manage your tool inventory', screen: 'tools' as Screen },
  { icon: '👥', title: 'My Vilij', description: 'Connect with tool-sharing neighbors', screen: 'villij' as Screen },
]

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Vilijr</h1>
        <HamburgerMenu onNavigate={onNavigate} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 bg-surface gap-4">
        {/* Welcome banner */}
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl px-5 py-4 text-white flex-shrink-0">
          <h2 className="text-lg font-bold mb-0.5">Welcome back, John! 👋</h2>
          <p className="text-xs opacity-90">You have 3 tools on loan and 2 pending requests</p>
        </div>

        {/* Feature cards — 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {cards.map((card) => (
            <Card
              key={card.title}
              onClick={card.screen ? () => onNavigate(card.screen!) : undefined}
              className="relative flex flex-col justify-center items-center text-center !p-4"
            >
              {card.badge && (
                <span className="absolute top-2 right-2 bg-danger text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {card.badge}
                </span>
              )}
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-sm font-bold text-content leading-tight">{card.title}</div>
              <div className="text-xs text-content-muted mt-1 leading-snug">{card.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
