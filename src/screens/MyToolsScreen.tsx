import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import Button from '../components/ui/Button'
import { toolCategories, userAddedTools } from '../data/tools'
import type { Tool, ToolCategory } from '../data/tools'

type Screen = 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance' | 'add-tool'

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
              <div className="min-w-0">
                <span className="text-sm font-medium text-content block truncate">{tool.name}</span>
                {tool.make && (
                  <span className="text-xs text-content-muted">{tool.make}{tool.model ? ` · ${tool.model}` : ''}</span>
                )}
              </div>
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
  // Re-render trigger when returning from AddToolScreen
  const [addedCount, setAddedCount] = useState(userAddedTools.length)

  // Merge user-added tools into a synthetic "My Added Tools" category if any exist
  const allCategories = [...toolCategories]
  if (userAddedTools.length > 0 && userAddedTools.length !== addedCount) {
    setAddedCount(userAddedTools.length)
  }

  // Build augmented category list: inject user-added tools into matching categories
  // and collect any that don't match into a "Recently Added" category
  const categoryMap = new Map(allCategories.map((c) => [c.id, { ...c, tools: [...c.tools] }]))
  const unmatchedUserTools: Tool[] = []

  for (const tool of userAddedTools) {
    if (categoryMap.has(tool.category)) {
      const cat = categoryMap.get(tool.category)!
      // Only add if not already present (idempotent for re-renders)
      if (!cat.tools.find((t) => t.id === tool.id)) {
        cat.tools.push(tool)
      }
    } else {
      if (!unmatchedUserTools.find((t) => t.id === tool.id)) {
        unmatchedUserTools.push(tool)
      }
    }
  }

  const mergedCategories = Array.from(categoryMap.values())
  if (unmatchedUserTools.length > 0) {
    mergedCategories.push({
      id: 'recently-added',
      name: 'Recently Added',
      icon: '✨',
      tools: unmatchedUserTools,
    })
  }

  const filtered = query.trim()
    ? mergedCategories
        .map((cat) => ({
          ...cat,
          tools: cat.tools.filter((t) =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.make?.toLowerCase().includes(query.toLowerCase()) ||
            t.model?.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((cat) => cat.tools.length > 0)
    : mergedCategories

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

        {/* Add Tool CTA — prominent pill button */}
        <button
          onClick={() => onNavigate('add-tool')}
          className="flex items-center gap-3 bg-primary rounded-2xl px-5 py-4 shadow-sm hover:opacity-90 transition-opacity text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
            📷
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-sm">Add a Tool</p>
            <p className="text-white/70 text-xs mt-0.5">Use camera to identify &amp; add</p>
          </div>
          <span className="text-white/70 text-lg">›</span>
        </button>

        {filtered.map((cat) => (
          <ToolCategorySection key={cat.id} category={cat} />
        ))}

        <Button variant="secondary">+ Add New Category</Button>
      </div>
    </div>
  )
}
