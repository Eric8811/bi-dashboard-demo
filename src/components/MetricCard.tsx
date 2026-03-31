import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import { SurfaceCard } from './SurfaceCard'
import type { Tone, Trend } from '../data/dashboardData'

type MetricCardProps = {
  title: string
  value: string
  deltaLabel: string
  trend: Trend
  blurb: string
  tone: Tone
  icon: LucideIcon
}

const toneStyles: Record<Tone, { glow: string; accent: string; chip: string }> = {
  sky: {
    glow: 'from-sky-400/20 via-sky-400/0',
    accent: 'text-sky-200',
    chip: 'bg-sky-500/15 text-sky-100 ring-sky-400/25',
  },
  emerald: {
    glow: 'from-emerald-400/20 via-emerald-400/0',
    accent: 'text-emerald-200',
    chip: 'bg-emerald-500/15 text-emerald-100 ring-emerald-400/25',
  },
  amber: {
    glow: 'from-amber-300/18 via-amber-300/0',
    accent: 'text-amber-100',
    chip: 'bg-amber-500/15 text-amber-100 ring-amber-300/25',
  },
  rose: {
    glow: 'from-rose-400/18 via-rose-400/0',
    accent: 'text-rose-200',
    chip: 'bg-rose-500/15 text-rose-100 ring-rose-400/25',
  },
}

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const

export function MetricCard({
  title,
  value,
  deltaLabel,
  trend,
  blurb,
  tone,
  icon: Icon,
}: MetricCardProps) {
  const styles = toneStyles[tone]
  const TrendIcon = trendIcons[trend]

  return (
    <SurfaceCard className="overflow-hidden p-5">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent`} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{title}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </div>
          <div className={`rounded-2xl border border-white/10 bg-white/5 p-3 ${styles.accent}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles.chip}`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {deltaLabel}
          </span>
          <p className="text-sm leading-6 text-slate-400">{blurb}</p>
        </div>
      </div>
    </SurfaceCard>
  )
}
