import type { ReactNode } from 'react'

type SurfaceCardProps = {
  children: ReactNode
  className?: string
  interactive?: boolean
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function SurfaceCard({
  children,
  className,
  interactive = true,
}: SurfaceCardProps) {
  return (
    <section
      className={joinClasses(
        'group relative overflow-hidden rounded-[22px] border border-white/8 bg-slate-950/55 shadow-[0_18px_48px_rgba(2,6,23,0.28)] backdrop-blur-md transition duration-300 sm:rounded-[26px]',
        interactive && 'hover:-translate-y-0.5 hover:border-white/15 hover:bg-slate-950/62',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/18 via-white/6 to-transparent" />
      {children}
    </section>
  )
}
