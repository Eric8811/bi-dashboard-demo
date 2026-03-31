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
  compact?: boolean
}

const toneStyles: Record<Tone, { glow: string; accent: string; chip: string }> = {
  sky: {
    glow: 'from-sky-400/12 via-sky-400/0',
    accent: 'text-sky-200',
    chip: 'bg-sky-500/15 text-sky-100 ring-sky-400/25',
  },
  emerald: {
    glow: 'from-emerald-400/12 via-emerald-400/0',
    accent: 'text-emerald-200',
    chip: 'bg-emerald-500/15 text-emerald-100 ring-emerald-400/25',
  },
  amber: {
    glow: 'from-amber-300/12 via-amber-300/0',
    accent: 'text-amber-100',
    chip: 'bg-amber-500/15 text-amber-100 ring-amber-300/25',
  },
  rose: {
    glow: 'from-rose-400/12 via-rose-400/0',
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
  compact = false,
}: MetricCardProps) {
  const styles = toneStyles[tone]
  const TrendIcon = trendIcons[trend]

  return (
    <SurfaceCard className={compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'}>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-br ${styles.glow} to-transparent ${
          compact ? 'h-16' : 'h-24'
        }`}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className={`uppercase tracking-[0.18em] text-slate-500 ${
                compact ? 'text-[10px] leading-4' : 'text-[11px] sm:text-sm'
              }`}
            >
              {title}
            </p>
            <p
              className={`font-semibold tracking-tight text-white ${
                compact ? 'mt-2 text-xl' : 'mt-3 text-2xl sm:text-3xl'
              }`}
            >
              {value}
            </p>
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/[0.04] ${styles.accent} ${
              compact ? 'p-2' : 'p-2.5 sm:p-3'
            }`}
          >
            <Icon className={compact ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5'} />
          </div>
        </div>

        <div className={`flex flex-col items-start gap-2.5 ${compact ? 'mt-4' : 'mt-5 sm:flex-row sm:items-center'}`}>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles.chip}`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {deltaLabel}
          </span>
          <p className={compact ? 'text-xs leading-5 text-slate-400' : 'text-sm leading-6 text-slate-400'}>
            {blurb}
          </p>
        </div>
      </div>
    </SurfaceCard>
  )
}
