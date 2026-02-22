import { useEffect } from 'react'

type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance'

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function SplashScreen({ onNavigate }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => onNavigate('login'), 2200)
    return () => clearTimeout(timer)
  }, [onNavigate])

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-primary gap-6">
      {/* Logo mark */}
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-24 h-24 rounded-3xl bg-white/15 flex items-center justify-center shadow-lg">
          <span className="text-5xl">🛠️</span>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-none">
            Villijr
          </h1>
          <p className="text-primary-light text-base font-medium mt-2 opacity-80">
            Share tools with your community
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/40"
            style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
