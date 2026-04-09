export interface Tool {
  id: string
  name: string
  category: string
  categoryIcon: string
  maint: boolean
  share: boolean
  tbd: boolean
  // Optional enriched fields populated when a tool is identified via camera
  make?: string
  model?: string
  yearRange?: string
  manufacturerUrl?: string
  partsUrl?: string
  manualUrl?: string
  photoUrl?: string
}

// Module-level store for user-added tools (persists for the session)
export const userAddedTools: Tool[] = []

export function addUserTool(tool: Tool) {
  userAddedTools.push(tool)
}

export interface ToolCategory {
  id: string
  name: string
  icon: string
  tools: Tool[]
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'hand',
    name: 'Hand Tools',
    icon: '🔨',
    tools: [
      { id: 'h1', name: 'Hammer', category: 'hand', categoryIcon: '🔨', maint: true, share: true, tbd: false },
      { id: 'h2', name: 'Screwdriver Set', category: 'hand', categoryIcon: '🔨', maint: false, share: true, tbd: false },
      { id: 'h3', name: 'Socket Wrench Set', category: 'hand', categoryIcon: '🔨', maint: true, share: false, tbd: false },
    ],
  },
  {
    id: 'power',
    name: 'Power Tools',
    icon: '⚡',
    tools: [
      { id: 'p1', name: 'Circular Saw', category: 'power', categoryIcon: '⚡', maint: true, share: true, tbd: false },
      { id: 'p2', name: 'Drill Driver', category: 'power', categoryIcon: '⚡', maint: true, share: true, tbd: true },
      { id: 'p3', name: 'Angle Grinder', category: 'power', categoryIcon: '⚡', maint: false, share: false, tbd: false },
    ],
  },
  {
    id: 'yard',
    name: 'Yard Tools',
    icon: '🌿',
    tools: [
      { id: 'y1', name: 'Lawn Mower', category: 'yard', categoryIcon: '🌿', maint: true, share: false, tbd: false },
      { id: 'y2', name: 'Leaf Blower', category: 'yard', categoryIcon: '🌿', maint: true, share: true, tbd: false },
    ],
  },
]
