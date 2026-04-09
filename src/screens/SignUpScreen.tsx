import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

type Screen = 'splash' | 'login' | 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance'

interface SignUpScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function SignUpScreen({ onNavigate }: SignUpScreenProps) {
  const [form, setForm] = useState({ name: '', email: '', address: '', search: '' })
  const [fileName, setFileName] = useState('')

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-surface">
      {/* Logo */}
      <div className="text-center mb-10 mt-4">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight mb-2">Vilijr</h1>
        <p className="text-content-muted text-sm font-medium">Share tools with your community</p>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />

        <Input
          label="Address"
          placeholder="123 Main St, City, State"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
        />

        {/* File upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-content">Upload Your Tools (CSV)</label>
          <label className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer bg-white hover:border-primary transition-colors">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
            />
            <div className="text-4xl mb-2">📄</div>
            <div className="font-semibold text-content mb-1">
              {fileName || 'Click to upload'}
            </div>
            <div className="text-xs text-content-muted">CSV format with tool names and categories</div>
          </label>
        </div>

        {/* People search */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-content">Find People in Your Area</label>
          <input
            type="text"
            placeholder="Search for friends to connect with..."
            value={form.search}
            onChange={(e) => update('search', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-border rounded-xl text-[15px] bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-content-muted transition-colors"
          />
          <p className="text-xs text-content-muted">We'll show you people nearby who are already on Vilijr</p>
        </div>

        <Button onClick={() => onNavigate('dashboard')}>
          Create Account →
        </Button>

        <p className="text-center">
          <button className="text-content-muted text-sm font-semibold" onClick={() => onNavigate('login')}>
            Already have an account? Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
