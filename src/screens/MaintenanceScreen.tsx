import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { maintenanceTasks } from '../data/maintenance'
import type { MaintenanceTask } from '../data/maintenance'

type Screen = 'signup' | 'dashboard' | 'tools' | 'search' | 'villij' | 'maintenance'

interface MaintenanceScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function MaintenanceScreen({ onNavigate }: MaintenanceScreenProps) {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(maintenanceTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
  }

  const high = tasks.filter((t) => t.priority === 'high')
  const medium = tasks.filter((t) => t.priority === 'medium')
  const upcoming = tasks.filter((t) => t.priority === 'upcoming')
  const dueCount = tasks.filter((t) => t.priority !== 'upcoming' && !t.done).length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white text-lg hover:bg-white/30 transition-colors"
        >
          ←
        </button>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Maintenance</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-surface flex flex-col gap-3">
        {/* Alert banner */}
        <div className="bg-amber-50 border-l-4 border-secondary rounded-xl p-4">
          <p className="font-bold text-secondary">{dueCount} Maintenance Tasks Due</p>
          <p className="text-sm text-content-muted">Keep your tools in top condition</p>
        </div>

        {/* High priority */}
        {high.length > 0 && (
          <>
            <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted mt-2">High Priority</h3>
            {high.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={toggle} />
            ))}
          </>
        )}

        {/* Medium priority */}
        {medium.length > 0 && (
          <>
            <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted mt-4">Medium Priority</h3>
            {medium.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={toggle} />
            ))}
          </>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <>
            <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted mt-4">Upcoming</h3>
            {upcoming.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={toggle} disabled />
            ))}
          </>
        )}

        <div className="mt-2">
          <Button variant="secondary">+ Add Custom Reminder</Button>
        </div>
      </div>
    </div>
  )
}

function TaskRow({
  task,
  onToggle,
  disabled = false,
}: {
  task: MaintenanceTask
  onToggle: (id: string) => void
  disabled?: boolean
}) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 ${disabled ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        disabled={disabled}
        className="w-6 h-6 accent-primary cursor-pointer flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-content ${task.done ? 'line-through text-content-muted' : ''}`}>
          {task.title}
        </p>
        <p className="text-sm font-semibold text-secondary">Due: {task.due}</p>
      </div>
      {task.priority !== 'upcoming' && (
        <Badge variant={task.priority}>{task.priority.toUpperCase()}</Badge>
      )}
    </div>
  )
}
