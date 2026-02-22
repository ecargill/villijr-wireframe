import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance'

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    onNavigate('dashboard')
  }

  return (
    <div className="flex-1 flex flex-col bg-surface overflow-y-auto">
      {/* Green top band */}
      <div className="bg-primary pt-14 pb-12 px-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-4 shadow">
          <span className="text-3xl">🛠️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Villijr</h1>
        <p className="text-white/70 text-sm font-medium mt-1">Welcome back</p>
      </div>

      {/* Card */}
      <div className="flex-1 bg-surface px-6 -mt-6 pt-10 flex flex-col gap-5 rounded-t-3xl">
        <h2 className="text-xl font-bold text-content">Sign in to your account</h2>

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError('') }}
        />

        {error && (
          <p className="text-sm text-danger font-semibold -mt-2">{error}</p>
        )}

        <button className="text-sm font-semibold text-primary text-right -mt-2 self-end">
          Forgot password?
        </button>

        <Button onClick={handleLogin}>
          Sign In →
        </Button>

        <p className="text-center text-xs text-content-muted pb-6">
          By signing in you agree to our{' '}
          <span className="text-primary font-semibold">Terms of Service</span>{' '}
          and{' '}
          <span className="text-primary font-semibold">Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}
