interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-content-muted text-lg pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl text-[15px] bg-white
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
          placeholder:text-content-muted transition-colors
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-content-muted text-lg"
        >
          ✕
        </button>
      )}
    </div>
  )
}
