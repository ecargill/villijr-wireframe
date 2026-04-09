import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  fullWidth = true,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-base font-bold transition-all min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light active:scale-[0.98]',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white active:scale-[0.98]',
    ghost: 'text-primary underline-offset-2 hover:underline',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
