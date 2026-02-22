import Card from '../components/ui/Card'

type Screen = 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance'

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void
}

const cards = [
  { icon: '🔍', title: 'Find a Tool', description: 'Search tools available in your Villij', screen: 'search' as Screen },
  { icon: '🔧', title: 'Maintenance', description: '3 tools need attention', screen: 'maintenance' as Screen, badge: 3 },
  { icon: '📦', title: 'My Tools', description: 'Manage your tool inventory', screen: 'tools' as Screen },
  { icon: '👥', title: 'My Villij', description: 'Connect with tool-sharing neighbors', screen: 'villij' as Screen },
  { icon: '🆕', title: 'Start a Villij', description: 'Create your own tool-sharing circle', screen: null },
]

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Villijr</h1>
        <button className="text-2xl">⚙️</button>
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
