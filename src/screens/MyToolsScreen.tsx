import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import Button from '../components/ui/Button'
import { toolCategories } from '../data/tools'
import type { Tool, ToolCategory } from '../data/tools'

type Screen = 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance'

interface MyToolsScreenProps {
  onNavigate: (screen: Screen) => void
}

function ToolCategorySection({ category }: { category: ToolCategory }) {
  const [open, setOpen] = useState(true)
  const [tools, setTools] = useState<Tool[]>(category.tools)

  const toggleTool = (id: string, field: 'maint' | 'share' | 'tbd') => {
    setTools((prev) => prev.map((t) => t.id === id ? { ...t, [field]: !t[field] } : t))
  }

  const toggleAll = (field: 'maint' | 'share' | 'tbd') => {
    const allChecked = tools.every((t) => t[field])
    setTools((prev) => prev.map((t) => ({ ...t, [field]: !allChecked })))
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* Category header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3 text-lg font-bold text-content">
          <span className="text-2xl">{category.icon}</span>
          <span>{category.name}</span>
        </div>
        <span className={`text-content-muted text-lg transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <>
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_56px_56px_56px] gap-2 items-end pb-3 mb-3 border-b border-border">
            <div />
            {(['maint', 'share', 'tbd'] as const).map((field) => (
              <div key={field} className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wide text-content-muted">
                  {field === 'maint' ? 'Maint.' : field === 'share' ? 'Share' : 'TBD'}
                </span>
                <input
                  type="checkbox"
                  checked={tools.every((t) => t[field])}
                  onChange={() => toggleAll(field)}
                  className="w-5 h-5 cursor-pointer accent-primary"
                />
              </div>
            ))}
          </div>

          {/* Tool rows */}
          {tools.map((tool, i) => (
            <div
              key={tool.id}
              className={`grid grid-cols-[1fr_56px_56px_56px] gap-2 items-center py-2.5 ${i < tools.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-sm font-medium text-content">{tool.name}</span>
              {(['maint', 'share', 'tbd'] as const).map((field) => (
                <div key={field} className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={tool[field]}
                    onChange={() => toggleTool(tool.id, field)}
                    className="w-5 h-5 cursor-pointer accent-primary"
                  />
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default function MyToolsScreen({ onNavigate }: MyToolsScreenProps) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">My Tools</h1>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-white text-base font-semibold"
        >
          Done
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search your tools..." />

        {toolCategories.map((cat) => (
          <ToolCategorySection key={cat.id} category={cat} />
        ))}

        <Button variant="secondary">+ Add New Category</Button>
      </div>
    </div>
  )
}
