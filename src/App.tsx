import { useState } from 'react'
import PhoneShell from './components/layout/PhoneShell'
import BottomNav from './components/layout/BottomNav'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import DashboardScreen from './screens/DashboardScreen'
import MyToolsScreen from './screens/MyToolsScreen'
import SearchScreen from './screens/SearchScreen'
import MyVillijScreen from './screens/MyVillijScreen'
import MaintenanceScreen from './screens/MaintenanceScreen'
import AddToolScreen from './screens/AddToolScreen'

export type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance' | 'add-tool'

const SCREENS_WITH_NAV: Screen[] = ['dashboard', 'tools', 'search', 'villij', 'maintenance']

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const navigate = (s: Screen) => setScreen(s)
  const showNav = SCREENS_WITH_NAV.includes(screen)

  const renderScreen = () => {
    switch (screen) {
      case 'splash':      return <SplashScreen onNavigate={navigate} />
      case 'login':       return <LoginScreen onNavigate={navigate} />
      case 'signup':      return <SignUpScreen onNavigate={navigate} />
      case 'dashboard':   return <DashboardScreen onNavigate={navigate} />
      case 'tools':       return <MyToolsScreen onNavigate={navigate} />
      case 'search':      return <SearchScreen onNavigate={navigate} />
      case 'villij':      return <MyVillijScreen onNavigate={navigate} />
      case 'maintenance': return <MaintenanceScreen onNavigate={navigate} />
      case 'add-tool':    return <AddToolScreen onBack={() => navigate('tools')} onNavigate={navigate} />
      default:            return <SplashScreen onNavigate={navigate} />
    }
  }

  return (
    <PhoneShell>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {renderScreen()}
      </div>
      {showNav && <BottomNav activeScreen={screen} onNavigate={navigate} />}
    </PhoneShell>
  )
}
