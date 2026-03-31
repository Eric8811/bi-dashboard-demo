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
        'group relative rounded-[28px] border border-white/10 bg-white/[0.045] shadow-panel backdrop-blur-xl transition duration-300',
        interactive && 'hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06]',
        className,
      )}
    >
      {children}
    </section>
  )
}
