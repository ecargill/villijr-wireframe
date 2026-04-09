import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-content">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-3.5 border-2 border-border rounded-xl text-[15px] bg-white
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
          placeholder:text-content-muted transition-colors
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
