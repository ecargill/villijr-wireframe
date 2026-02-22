export interface MaintenanceTask {
  id: string
  title: string
  due: string
  priority: 'high' | 'medium' | 'upcoming'
  done: boolean
}

export const maintenanceTasks: MaintenanceTask[] = [
  { id: 'm1', title: 'Sharpen Lawn Mower Blade', due: 'Jan 8, 2026', priority: 'high', done: false },
  { id: 'm2', title: 'Oil Change - Circular Saw', due: 'Jan 10, 2026', priority: 'high', done: false },
  { id: 'm3', title: 'Clean Air Filter - Leaf Blower', due: 'Jan 15, 2026', priority: 'medium', done: false },
  { id: 'm4', title: 'Battery Check - Drill Driver', due: 'Jan 20, 2026', priority: 'upcoming', done: false },
]
