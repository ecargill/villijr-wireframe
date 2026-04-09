import { useState, useRef, useEffect } from 'react'

interface HamburgerMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (screen: any) => void
}

export default function HamburgerMenu({ onNavigate }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const go = (screen: string) => {
    setOpen(false)
    onNavigate(screen)
  }

  return (
    <div className="relative ml-auto" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-white/20 transition-colors"
      >
        <span className="block w-5 h-[2px] bg-white rounded-full" />
        <span className="block w-5 h-[2px] bg-white rounded-full" />
        <span className="block w-5 h-[2px] bg-white rounded-full" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-border">
          <button onClick={() => go('dashboard')} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-content hover:bg-gray-50 transition-colors border-b border-border">
            <span className="text-base">🏠</span> Home
          </button>
          <button onClick={() => go('tools')} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-content hover:bg-gray-50 transition-colors border-b border-border">
            <span className="text-base">🛠️</span> My Tools
          </button>
          <button onClick={() => go('search')} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-content hover:bg-gray-50 transition-colors border-b border-border">
            <span className="text-base">🔍</span> Find a Tool
          </button>
          <button onClick={() => go('villij')} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-content hover:bg-gray-50 transition-colors border-b border-border">
            <span className="text-base">👥</span> My Vilij
          </button>
          <button onClick={() => go('maintenance')} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-content hover:bg-gray-50 transition-colors border-b border-border">
            <span className="text-base">🔧</span> Maintenance
          </button>
          <button onClick={() => go('login')} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-danger hover:bg-red-50 transition-colors">
            <span className="text-base">🚪</span> Log out
          </button>
        </div>
      )}
    </div>
  )
}
