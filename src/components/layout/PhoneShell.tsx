import { ReactNode } from 'react'

interface PhoneShellProps {
  children: ReactNode
}

export default function PhoneShell({ children }: PhoneShellProps) {
  return (
    // Outer shell — fills the full body height, dark bg on desktop
    <div className="h-full w-full bg-gray-900 md:flex md:items-center md:justify-center md:p-8">
      {/* Phone frame — full height on mobile, fixed size on desktop */}
      <div className="
        relative w-full h-full bg-surface flex flex-col overflow-hidden
        md:w-[420px] md:h-[860px] md:rounded-[2.5rem] md:shadow-2xl
        md:ring-8 md:ring-gray-900
      ">
        {/* Notch bar — visible on desktop only */}
        <div className="hidden md:flex h-8 bg-gray-900 items-center justify-center flex-shrink-0 relative">
          <div className="w-28 h-5 bg-black rounded-b-2xl" />
          <span className="absolute left-6 text-white text-xs font-semibold">9:41</span>
          <span className="absolute right-6 text-white text-xs font-semibold">⚡︎ 100%</span>
        </div>

        {/* Screen content area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
