import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export default function Card({ children, onClick, className = '' }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-5 shadow-sm
        ${onClick ? 'cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
