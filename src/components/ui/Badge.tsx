type BadgeVariant = 'available' | 'on-loan' | 'high' | 'medium' | 'notification'

interface BadgeProps {
  variant: BadgeVariant
  children: string
}

const styles: Record<BadgeVariant, string> = {
  available: 'bg-emerald-100 text-emerald-700',
  'on-loan': 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  notification: 'bg-danger text-white',
}

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${styles[variant]}`}>
      {children}
    </span>
  )
}
