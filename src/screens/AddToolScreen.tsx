import { useState, useRef } from 'react'
import { addUserTool } from '../data/tools'
import type { Tool } from '../data/tools'
import Button from '../components/ui/Button'

interface AddToolScreenProps {
  onBack: () => void
}

// ─── Simulated AI identification results keyed by rough "detected label" ───────
const MOCK_RESULTS: Record<string, Omit<Tool, 'id' | 'category' | 'categoryIcon' | 'maint' | 'share' | 'tbd'>> = {
  drill: {
    name: 'DeWalt DCD777 Drill Driver',
    make: 'DeWalt',
    model: 'DCD777',
    yearRange: '2017 – present',
    manufacturerUrl: 'https://www.dewalt.com',
    partsUrl: 'https://www.ereplacementparts.com/dewalt-dcd777-parts-c-158_1927_38997.html',
    manualUrl: 'https://www.dewalt.com/ASSETS/DOCUMENTS/MANUALS/N487112.PDF',
  },
  saw: {
    name: 'Milwaukee M18 Circular Saw',
    make: 'Milwaukee',
    model: 'M18 2730-20',
    yearRange: '2015 – present',
    manufacturerUrl: 'https://www.milwaukeetool.com',
    partsUrl: 'https://www.toolpartspro.com/milwaukee/2730-20-parts-c-16_1453_19305.html',
    manualUrl: 'https://www.milwaukeetool.com/Support/Find-A-Manual',
  },
  mower: {
    name: 'Honda HRN216VKA Lawn Mower',
    make: 'Honda',
    model: 'HRN216VKA',
    yearRange: '2019 – present',
    manufacturerUrl: 'https://powerequipment.honda.com',
    partsUrl: 'https://www.hondapowerequipment.com/parts-center',
    manualUrl: 'https://powerequipment.honda.com/support/manuals',
  },
  default: {
    name: 'Unknown Power Tool',
    make: 'Unknown',
    model: 'Unidentified',
    yearRange: 'Unknown',
    manufacturerUrl: undefined,
    partsUrl: undefined,
    manualUrl: undefined,
  },
}

function pickMockResult(file: File) {
  const name = file.name.toLowerCase()
  if (name.includes('drill')) return MOCK_RESULTS.drill
  if (name.includes('saw')) return MOCK_RESULTS.saw
  if (name.includes('mow')) return MOCK_RESULTS.mower
  // Random for demo purposes
  const keys = ['drill', 'saw', 'mower']
  return MOCK_RESULTS[keys[Math.floor(Math.random() * keys.length)]]
}

// ─── Category assignment heuristic ────────────────────────────────────────────
function guessCategory(name: string): { category: string; categoryIcon: string } {
  const n = name.toLowerCase()
  if (n.includes('mow') || n.includes('blow') || n.includes('trimmer') || n.includes('edger')) {
    return { category: 'yard', categoryIcon: '🌿' }
  }
  if (n.includes('drill') || n.includes('saw') || n.includes('grinder') || n.includes('nailer') || n.includes('router')) {
    return { category: 'power', categoryIcon: '⚡' }
  }
  return { category: 'hand', categoryIcon: '🔨' }
}

// ─── Scanning animation overlay ───────────────────────────────────────────────
function ScanningOverlay({ photoUrl }: { photoUrl: string }) {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black">
      <img src={photoUrl} alt="Tool being scanned" className="w-full h-full object-cover opacity-80" />
      {/* Scan line */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="scan-line absolute left-0 right-0 h-1 bg-primary/60 blur-[2px] rounded-full" />
        <div className="scan-overlay absolute inset-0 border-4 border-primary/50 rounded-2xl" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-white text-xs font-semibold tracking-wide">Identifying tool…</span>
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary-light"
                  style={{ animation: `pulse 1s ease-in-out ${i * 0.25}s infinite` }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scanMove {
          0%   { top: 5%; }
          50%  { top: 85%; }
          100% { top: 5%; }
        }
        .scan-line { animation: scanMove 2s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

// ─── Result card ──────────────────────────────────────────────────────────────
function ResultCard({ tool, photoUrl }: { tool: Partial<Tool>; photoUrl: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Tool photo */}
      <div className="relative w-full h-44 bg-gray-100">
        <img src={photoUrl} alt={tool.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-primary rounded-full px-3 py-1">
          <span className="text-white text-xs font-bold">✓ Identified</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Name / make / model */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-content-muted mb-1">Identified Tool</p>
          <h2 className="text-lg font-extrabold text-content leading-tight">{tool.name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InfoChip label="Make" value={tool.make ?? '—'} />
          <InfoChip label="Model" value={tool.model ?? '—'} />
          <InfoChip label="Est. Years" value={tool.yearRange ?? '—'} />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 mt-1">
          {tool.manufacturerUrl && (
            <LinkRow icon="🏭" label="Manufacturer site" url={tool.manufacturerUrl} />
          )}
          {tool.partsUrl && (
            <LinkRow icon="🔩" label="Replacement parts" url={tool.partsUrl} />
          )}
          {tool.manualUrl && (
            <LinkRow icon="📄" label="Owner's manual" url={tool.manualUrl} />
          )}
        </div>
      </div>
    </div>
  )
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-lg px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-content-muted">{label}</p>
      <p className="text-sm font-semibold text-content mt-0.5 truncate">{value}</p>
    </div>
  )
}

function LinkRow({ icon, label, url }: { icon: string; label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 text-sm font-semibold text-content">{label}</span>
      <span className="text-content-muted text-sm">↗</span>
    </a>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
type Step = 'choose' | 'scanning' | 'result' | 'manual'

export default function AddToolScreen({ onBack }: AddToolScreenProps) {
  const [step, setStep] = useState<Step>('choose')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [identifiedTool, setIdentifiedTool] = useState<Partial<Tool> | null>(null)
  const [manualName, setManualName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Called once the user picks/captures an image
  const handleImageChosen = (file: File) => {
    const url = URL.createObjectURL(file)
    setPhotoUrl(url)
    setStep('scanning')

    // Simulate a 2.5s AI round-trip
    setTimeout(() => {
      const result = pickMockResult(file)
      setIdentifiedTool(result)
      setStep('result')
    }, 2500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageChosen(file)
  }

  const handleConfirmAdd = () => {
    if (!identifiedTool) return
    const { category, categoryIcon } = guessCategory(identifiedTool.name ?? '')
    const tool: Tool = {
      id: `user-${Date.now()}`,
      name: identifiedTool.name ?? 'New Tool',
      category,
      categoryIcon,
      maint: false,
      share: false,
      tbd: false,
      ...identifiedTool,
      photoUrl: photoUrl ?? undefined,
    }
    addUserTool(tool)
    onBack()
  }

  const handleManualAdd = () => {
    if (!manualName.trim()) return
    const { category, categoryIcon } = guessCategory(manualName)
    const tool: Tool = {
      id: `user-${Date.now()}`,
      name: manualName.trim(),
      category,
      categoryIcon,
      maint: false,
      share: false,
      tbd: false,
    }
    addUserTool(tool)
    onBack()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white text-lg hover:bg-white/30 transition-colors"
        >
          ←
        </button>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Add a Tool</h1>
      </div>

      {/* ── CHOOSE step ── */}
      {step === 'choose' && (
        <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-4">
          <p className="text-sm text-content-muted font-medium">
            Point your camera at a tool and we'll identify it automatically, or add it manually.
          </p>

          {/* Camera option */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">
              📷
            </div>
            <div>
              <p className="font-bold text-content text-base">Use Camera</p>
              <p className="text-sm text-content-muted mt-0.5">
                AI identifies make, model, year &amp; finds parts links automatically
              </p>
            </div>
            <span className="text-content-muted ml-auto">›</span>
          </button>

          {/* Manual option */}
          <button
            onClick={() => setStep('manual')}
            className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center text-3xl flex-shrink-0">
              ✏️
            </div>
            <div>
              <p className="font-bold text-content text-base">Enter Manually</p>
              <p className="text-sm text-content-muted mt-0.5">Type the tool name yourself</p>
            </div>
            <span className="text-content-muted ml-auto">›</span>
          </button>

          {/* Hidden file input — capture="environment" opens rear camera on mobile */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* ── SCANNING step ── */}
      {step === 'scanning' && photoUrl && (
        <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-4">
          <ScanningOverlay photoUrl={photoUrl} />
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-content-muted text-center">
              Analyzing image with AI…
            </p>
            <p className="text-xs text-content-muted text-center mt-1">
              Checking make, model, and finding resources
            </p>
          </div>
        </div>
      )}

      {/* ── RESULT step ── */}
      {step === 'result' && identifiedTool && photoUrl && (
        <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-4">
          <ResultCard tool={identifiedTool} photoUrl={photoUrl} />

          <div className="flex flex-col gap-3 pb-2">
            <Button onClick={handleConfirmAdd}>
              ＋ Add to My Tools
            </Button>
            <Button variant="secondary" onClick={() => setStep('choose')}>
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* ── MANUAL step ── */}
      {step === 'manual' && (
        <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-content-muted mb-2">Tool Name</p>
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="e.g. Milwaukee M18 Drill"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm font-medium text-content
                           focus:outline-none focus:ring-2 focus:ring-primary/40 bg-surface"
                autoFocus
              />
            </div>
            <p className="text-xs text-content-muted">
              We'll automatically categorize the tool based on its name.
            </p>
          </div>

          <Button onClick={handleManualAdd} disabled={!manualName.trim()}>
            ＋ Add to My Tools
          </Button>
        </div>
      )}
    </div>
  )
}
