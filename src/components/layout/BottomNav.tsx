type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance' | 'add-tool'

interface BottomNavProps {
  activeScreen: Screen
  onNavigate: (screen: Screen) => void
}

const tabs = [
  { id: 'dashboard' as Screen, label: 'Home', icon: '🏠' },
  { id: 'search' as Screen, label: 'Search', icon: '🔍' },
  { id: 'tools' as Screen, label: 'My Tools', icon: '🛠️' },
  { id: 'villij' as Screen, label: 'Villij', icon: '👥' },
]

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const activeTab = activeScreen === 'maintenance' ? 'dashboard'
    : activeScreen === 'add-tool' ? 'tools'
    : activeScreen

  return (
    <div className="flex justify-around items-center py-2 bg-white border-t border-border flex-shrink-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`
              flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold transition-colors
              ${isActive ? 'text-primary bg-primary/10' : 'text-content-muted'}
            `}
          >
            <span className="text-2xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
