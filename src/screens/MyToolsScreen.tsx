import { useState, useRef, useEffect } from 'react'
import SearchBar from '../components/ui/SearchBar'
import { toolCategories, userAddedTools } from '../data/tools'
import type { Tool, ToolCategory } from '../data/tools'

type Screen = 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance' | 'add-tool'

interface MyToolsScreenProps {
  onNavigate: (screen: Screen) => void
}

const ICON_OPTIONS = ['🔨', '⚡', '🌿', '🚗', '🏠', '🪚', '🔧', '🪛', '🧰', '💡', '🌊', '❄️']

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

          {tools.length === 0 && (
            <p className="text-sm text-content-muted text-center py-3">No tools yet</p>
          )}

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
  const [addedCount, setAddedCount] = useState(userAddedTools.length)
  const [userCategories, setUserCategories] = useState<ToolCategory[]>([])
  const [addingCategory, setAddingCategory] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatIcon, setNewCatIcon] = useState('🔨')
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Focus name input when form opens
  useEffect(() => {
    if (addingCategory) nameInputRef.current?.focus()
  }, [addingCategory])

  if (userAddedTools.length > 0 && userAddedTools.length !== addedCount) {
    setAddedCount(userAddedTools.length)
  }

  const categoryMap = new Map(
    [...toolCategories, ...userCategories].map((c) => [c.id, { ...c, tools: [...c.tools] }])
  )
  const unmatchedUserTools: Tool[] = []

  for (const tool of userAddedTools) {
    if (categoryMap.has(tool.category)) {
      const cat = categoryMap.get(tool.category)!
      if (!cat.tools.find((t) => t.id === tool.id)) cat.tools.push(tool)
    } else {
      if (!unmatchedUserTools.find((t) => t.id === tool.id)) unmatchedUserTools.push(tool)
    }
  }

  const mergedCategories = Array.from(categoryMap.values())
  if (unmatchedUserTools.length > 0) {
    mergedCategories.push({ id: 'recently-added', name: 'Recently Added', icon: '✨', tools: unmatchedUserTools })
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

  const handleAddCategory = () => {
    if (!newCatName.trim()) return
    const newCat: ToolCategory = {
      id: `user-cat-${Date.now()}`,
      name: newCatName.trim(),
      icon: newCatIcon,
      tools: [],
    }
    setUserCategories((prev) => [...prev, newCat])
    setNewCatName('')
    setNewCatIcon('🔨')
    setAddingCategory(false)
  }

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

        {/* Action buttons row */}
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('add-tool')}
            className="flex-1 flex items-center gap-3 bg-primary rounded-2xl px-4 py-4 shadow-sm hover:opacity-90 transition-opacity text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
              📷
            </div>
            <p className="font-bold text-white text-sm">Add a Tool</p>
            <span className="text-white/70 text-lg ml-auto">›</span>
          </button>

          <button
            onClick={() => setAddingCategory((v) => !v)}
            className={`flex-1 flex items-center gap-3 rounded-2xl px-4 py-4 shadow-sm transition-colors text-left border
              ${addingCategory
                ? 'bg-primary/10 border-primary/30'
                : 'bg-white border-border hover:bg-gray-50'
              }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0
              ${addingCategory ? 'bg-primary/20' : 'bg-surface'}`}>
              🗂️
            </div>
            <p className={`font-bold text-sm ${addingCategory ? 'text-primary' : 'text-content'}`}>
              Add Category
            </p>
            <span className={`text-lg ml-auto transition-transform ${addingCategory ? 'rotate-90 text-primary' : 'text-content-muted'}`}>›</span>
          </button>
        </div>

        {/* Inline Add Category form */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: addingCategory ? '480px' : '0px',
            opacity: addingCategory ? 1 : 0,
            transition: 'max-height 350ms ease-in-out, opacity 250ms ease-in-out',
          }}
        >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/20 flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-content-muted">New Category</p>

            {/* Icon picker */}
            <div>
              <p className="text-xs font-semibold text-content-muted mb-2">Choose an icon</p>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewCatIcon(icon)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all
                      ${newCatIcon === icon
                        ? 'bg-primary/15 ring-2 ring-primary scale-110'
                        : 'bg-surface hover:bg-gray-100'
                      }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Name input */}
            <div>
              <p className="text-xs font-semibold text-content-muted mb-2">Category name</p>
              <input
                ref={nameInputRef}
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                placeholder="e.g. Plumbing, Electrical…"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm font-medium text-content
                           focus:outline-none focus:ring-2 focus:ring-primary/40 bg-surface"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => { setAddingCategory(false); setNewCatName(''); setNewCatIcon('🔨') }}
                className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold text-content-muted hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!newCatName.trim()}
                className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold
                           disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>

        {filtered.map((cat) => (
          <ToolCategorySection key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  )
}
