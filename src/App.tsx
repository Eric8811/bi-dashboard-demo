import { useEffect, useState, type ReactNode } from 'react'
import {
  AlertTriangle,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  Globe2,
  RefreshCw,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { FilterSelect } from './components/FilterSelect'
import { MetricCard } from './components/MetricCard'
import { PortfolioTable } from './components/PortfolioTable'
import { SegmentedControl } from './components/SegmentedControl'
import { SurfaceCard } from './components/SurfaceCard'
import {
  getDashboardCopy,
  getLocalizedOptions,
  getLocalizedRoleOptions,
  type Language,
  type Role,
} from './data/dashboardCopy'
import {
  appOptions,
  channelOptions,
  dateRangeOptions,
  formatCountTick,
  formatMillionsTick,
  formatRoiTick,
  formatTooltipCount,
  formatTooltipCurrency,
  formatTooltipPercent,
  getDashboardSnapshot,
  regionOptions,
  type AppFilterValue,
  type ChannelValue,
  type DashboardSnapshot,
  type DateRangeValue,
  type FilterState,
  type RegionValue,
  type ValueFormat,
} from './data/dashboardData'

const defaultFilters: FilterState = {
  dateRange: 'qtd',
  app: 'all',
  channel: 'all',
  region: 'all',
}

const metricIcons: Record<string, LucideIcon> = {
  revenue: CircleDollarSign,
  efficiency: Target,
  retention: Users,
  release: Rocket,
  risk: AlertTriangle,
  backlog: Clock3,
  activation: Sparkles,
  operations: TrendingUp,
}

const alertStyles = {
  high: 'border-rose-400/20 bg-rose-400/10 text-rose-100',
  medium: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  watch: 'border-sky-400/20 bg-sky-400/10 text-sky-100',
} as const

type AppCopy = ReturnType<typeof getDashboardCopy>
type RoleCopy = AppCopy['roles'][Role]
type MobileChartTab = 'area' | 'bar' | 'line'

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function getTickFormatter(format: ValueFormat) {
  if (format === 'currency') {
    return formatMillionsTick
  }

  if (format === 'roi') {
    return formatRoiTick
  }

  if (format === 'count') {
    return formatCountTick
  }

  return (value: number) => `${value}%`
}

function getTooltipFormatter(format: ValueFormat) {
  if (format === 'currency') {
    return formatTooltipCurrency
  }

  if (format === 'count') {
    return formatTooltipCount
  }

  return formatTooltipPercent
}

function getYAxisWidth(format: ValueFormat, compact = false) {
  if (compact) {
    if (format === 'currency') {
      return 40
    }

    if (format === 'roi') {
      return 36
    }

    return 32
  }

  if (format === 'currency') {
    return 52
  }

  if (format === 'roi') {
    return 48
  }

  return 44
}

function getBarAxisWidth(compact: boolean, isTablet: boolean) {
  if (compact) {
    return 84
  }

  if (isTablet) {
    return 112
  }

  return 148
}

function MobileChipGroup({
  label,
  options,
  value,
  onChange,
  compact = false,
}: {
  label?: string
  options: readonly { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  compact?: boolean
}) {
  return (
    <div>
      {label ? (
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={joinClasses(
              'rounded-full border text-xs font-semibold transition',
              compact ? 'px-3 py-1.5' : 'px-3 py-1.5',
              value === option.value
                ? 'border-white bg-white text-slate-950'
                : 'border-white/10 bg-white/5 text-slate-300',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MetaBadge({
  icon: Icon,
  children,
  className,
}: {
  icon: LucideIcon
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={joinClasses(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300',
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 text-slate-500" />
      <span>{children}</span>
    </div>
  )
}

function SectionLead({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail: string
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl text-white">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  )
}

function DashboardAreaPanel({
  roleCopy,
  dashboard,
  compact = false,
}: {
  roleCopy: RoleCopy
  dashboard: DashboardSnapshot
  compact?: boolean
}) {
  return (
    <SurfaceCard className={joinClasses(compact ? 'p-5' : 'p-6')} interactive={false}>
      <div
        className={joinClasses(
          'border-b border-white/10 pb-5',
          !compact && 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{roleCopy.sections.areaEyebrow}</p>
          <h3 className={joinClasses('mt-2 font-display text-white', compact ? 'text-xl' : 'text-2xl')}>
            {roleCopy.sections.areaTitle}
          </h3>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-sm text-slate-300 sm:mt-0">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          {dashboard.areaChart.headline}
        </div>
      </div>

      <div className={joinClasses('mt-6', compact ? 'h-60' : 'h-64 sm:h-80')}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dashboard.areaChart.data}>
            <defs>
              <linearGradient id="primaryFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="secondaryFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.16} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, 0.14)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: compact ? 11 : 12 }}
            />
            <YAxis
              tickFormatter={getTickFormatter(dashboard.areaChart.format)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: compact ? 11 : 12 }}
              width={getYAxisWidth(dashboard.areaChart.format, compact)}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.96)',
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: '18px',
                boxShadow: '0 20px 60px rgba(2, 6, 23, 0.4)',
              }}
              formatter={getTooltipFormatter(dashboard.areaChart.format)}
              labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Area
              type="monotone"
              dataKey="secondary"
              name={roleCopy.series.areaSecondary}
              stroke="#94a3b8"
              strokeWidth={2}
              fill="url(#secondaryFill)"
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="primary"
              name={roleCopy.series.areaPrimary}
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#primaryFill)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SurfaceCard>
  )
}

function DashboardBarPanel({
  roleCopy,
  dashboard,
  compact = false,
  isTablet = false,
}: {
  roleCopy: RoleCopy
  dashboard: DashboardSnapshot
  compact?: boolean
  isTablet?: boolean
}) {
  return (
    <SurfaceCard className={joinClasses(compact ? 'p-5' : 'p-6')} interactive={false}>
      <div
        className={joinClasses(
          'border-b border-white/10 pb-5',
          !compact && 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{roleCopy.sections.barEyebrow}</p>
          <h3 className={joinClasses('mt-2 font-display text-white', compact ? 'text-xl' : 'text-2xl')}>
            {roleCopy.sections.barTitle}
          </h3>
        </div>
        <div className="mt-3 max-w-sm text-sm leading-6 text-slate-400 sm:mt-0">{roleCopy.sections.barSubtitle}</div>
      </div>

      <div className={joinClasses('mt-6', compact ? 'h-56' : 'h-64 sm:h-80')}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dashboard.barChart.data}
            layout="vertical"
            margin={{ left: compact ? 4 : 18, right: compact ? 6 : 12 }}
          >
            <CartesianGrid horizontal={false} stroke="rgba(148, 163, 184, 0.14)" />
            <XAxis
              type="number"
              tickFormatter={getTickFormatter(dashboard.barChart.format)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: compact ? 11 : 12 }}
            />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#cbd5e1', fontSize: compact ? 11 : 12 }}
              width={getBarAxisWidth(compact, isTablet)}
            />
            <Tooltip
              cursor={{ fill: 'rgba(56, 189, 248, 0.08)' }}
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.96)',
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: '18px',
              }}
              formatter={getTooltipFormatter(dashboard.barChart.format)}
              labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Bar
              dataKey="metric"
              name={roleCopy.series.bar}
              radius={[0, 18, 18, 0]}
              fill="#34d399"
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={joinClasses('mt-4', compact ? 'space-y-3' : 'grid gap-3 sm:grid-cols-2')}>
        {dashboard.barChart.data.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 transition duration-300 hover:border-white/15 hover:bg-slate-950/60"
          >
            <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
              <span>{item.label}</span>
              <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">{item.chip}</span>
            </div>
            <div className="mt-2 text-lg font-semibold text-white">{item.valueLabel}</div>
          </div>
        ))}
      </div>
    </SurfaceCard>
  )
}

function DashboardLinePanel({
  roleCopy,
  dashboard,
  compact = false,
}: {
  roleCopy: RoleCopy
  dashboard: DashboardSnapshot
  compact?: boolean
}) {
  return (
    <SurfaceCard className={joinClasses(compact ? 'p-5' : 'p-6')} interactive={false}>
      <div
        className={joinClasses(
          'border-b border-white/10 pb-5',
          !compact && 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{roleCopy.sections.lineEyebrow}</p>
          <h3 className={joinClasses('mt-2 font-display text-white', compact ? 'text-xl' : 'text-2xl')}>
            {roleCopy.sections.lineTitle}
          </h3>
        </div>
        <div className="mt-3 inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100 sm:mt-0">
          {dashboard.lineChart.badge}
        </div>
      </div>

      <div className={joinClasses('mt-6', compact ? 'h-56' : 'h-64 sm:h-80')}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dashboard.lineChart.data}>
            <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, 0.14)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: compact ? 11 : 12 }}
            />
            <YAxis
              tickFormatter={getTickFormatter(dashboard.lineChart.format)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: compact ? 11 : 12 }}
              width={getYAxisWidth(dashboard.lineChart.format, compact)}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.96)',
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: '18px',
              }}
              formatter={getTooltipFormatter(dashboard.lineChart.format)}
              labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Line
              type="monotone"
              dataKey="first"
              name={roleCopy.series.lineFirst}
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 4, fill: '#38bdf8' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="second"
              name={roleCopy.series.lineSecond}
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4, fill: '#f59e0b' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={joinClasses('mt-4', compact ? 'space-y-3' : 'grid gap-3 sm:grid-cols-2')}>
        {dashboard.lineChart.stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 transition duration-300 hover:border-white/15 hover:bg-slate-950/60"
          >
            <div className="text-sm text-slate-400">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
          </div>
        ))}
      </div>
    </SurfaceCard>
  )
}

function AlertsPanel({
  copy,
  roleCopy,
  dashboard,
  compact = false,
}: {
  copy: AppCopy
  roleCopy: RoleCopy
  dashboard: DashboardSnapshot
  compact?: boolean
}) {
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null)

  if (compact) {
    return (
      <SurfaceCard className="p-4" interactive={false}>
        <div className="border-b border-white/10 pb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{roleCopy.sections.alertsEyebrow}</p>
          <h3 className="mt-2 font-display text-xl text-white">{roleCopy.sections.alertsTitle}</h3>
        </div>

        <div className="mt-4 space-y-3">
          {dashboard.alerts.map((alert, index) => {
            const isOpen = expandedAlert === index

            return (
              <article
                key={alert.title}
                className="rounded-[20px] border border-white/10 bg-white/[0.025] transition duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedAlert(isOpen ? null : index)}
                  className="flex w-full items-start gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="rounded-2xl bg-white/[0.04] p-2.5 text-amber-100">
                    <AlertTriangle className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[15px] font-medium leading-6 text-white">{alert.title}</h4>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${alertStyles[alert.severity]}`}
                      >
                        {copy.severityLabels[alert.severity]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{alert.detail}</p>
                  </div>

                  <ChevronRight
                    className={joinClasses(
                      'mt-1 h-4 w-4 shrink-0 text-slate-600 transition',
                      isOpen && 'rotate-90 text-slate-300',
                    )}
                  />
                </button>

                {isOpen ? (
                  <div className="border-t border-white/10 px-4 pb-4 pt-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3.5 py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {copy.mobile.action}
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-slate-200">{alert.action}</p>
                    </div>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </SurfaceCard>
    )
  }

  return (
    <SurfaceCard className={joinClasses(compact ? 'p-5' : 'p-6')} interactive={false}>
      <div className="border-b border-white/10 pb-5">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{roleCopy.sections.alertsEyebrow}</p>
        <h3 className={joinClasses('mt-2 font-display text-white', compact ? 'text-xl' : 'text-2xl')}>
          {roleCopy.sections.alertsTitle}
        </h3>
      </div>

      <div className="mt-6 space-y-4">
        {dashboard.alerts.map((alert) => (
          <article
            key={alert.title}
            className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 transition duration-300 hover:border-white/15 hover:bg-slate-950/65"
          >
            <div className={joinClasses('gap-4', compact ? 'flex flex-col' : 'flex items-start justify-between')}>
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white/5 p-3 text-amber-100">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{alert.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{alert.detail}</p>
                </div>
              </div>
              <span
                className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${alertStyles[alert.severity]}`}
              >
                {copy.severityLabels[alert.severity]}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <span className="font-medium text-white">{roleCopy.sections.actionLabel}</span> {alert.action}
            </div>
          </article>
        ))}
      </div>
    </SurfaceCard>
  )
}

function PortfolioPanel({
  copy,
  roleCopy,
  dashboard,
  compact = false,
}: {
  copy: AppCopy
  roleCopy: RoleCopy
  dashboard: DashboardSnapshot
  compact?: boolean
}) {
  return (
    <SurfaceCard className={joinClasses(compact ? 'p-5' : 'mt-6 p-6')} interactive={false}>
      <div className="flex flex-col gap-3 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{roleCopy.sections.tableEyebrow}</p>
          <h3 className={joinClasses('mt-2 font-display text-white', compact ? 'text-xl' : 'text-2xl')}>
            {roleCopy.sections.tableTitle}
          </h3>
        </div>
        <div className="text-sm text-slate-400">{dashboard.portfolioTable.headline}</div>
      </div>

      <div className="mt-6">
        <PortfolioTable
          columns={dashboard.portfolioTable.columns}
          rows={dashboard.portfolioTable.rows}
          emptyMessage={dashboard.portfolioTable.emptyMessage}
          moreLabel={copy.mobile.more}
          lessLabel={copy.mobile.less}
        />
      </div>
    </SurfaceCard>
  )
}

function MobileFilterSheet({
  copy,
  filters,
  dateOptions,
  appOptions,
  channelOptions,
  regionOptions,
  onChange,
  onReset,
  onClose,
}: {
  copy: AppCopy
  filters: FilterState
  dateOptions: readonly { value: string; label: string }[]
  appOptions: readonly { value: string; label: string }[]
  channelOptions: readonly { value: string; label: string }[]
  regionOptions: readonly { value: string; label: string }[]
  onChange: <Key extends keyof FilterState>(key: Key, value: FilterState[Key]) => void
  onReset: () => void
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/70 backdrop-blur-sm md:hidden">
      <button type="button" aria-label={copy.mobile.done} className="absolute inset-0" onClick={onClose} />
      <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-[30px] border border-white/10 bg-[#08101f] px-4 pb-6 pt-5 shadow-2xl">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/10" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{copy.mobile.filters}</p>
            <h2 className="mt-2 font-display text-2xl text-white">{copy.mobile.refineView}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <FilterSelect
            label={copy.filters.dateRange}
            value={filters.dateRange}
            options={dateOptions}
            onChange={(value) => onChange('dateRange', value as DateRangeValue)}
          />
          <FilterSelect
            label={copy.filters.app}
            value={filters.app}
            options={appOptions}
            onChange={(value) => onChange('app', value as AppFilterValue)}
          />
          <FilterSelect
            label={copy.filters.channel}
            value={filters.channel}
            options={channelOptions}
            onChange={(value) => onChange('channel', value as ChannelValue)}
          />
          <FilterSelect
            label={copy.filters.region}
            value={filters.region}
            options={regionOptions}
            onChange={(value) => onChange('region', value as RegionValue)}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200"
          >
            {copy.mobile.reset}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-sky-300/20 bg-sky-400/15 px-4 py-3 text-sm font-semibold text-sky-100"
          >
            {copy.mobile.done}
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [role, setRole] = useState<Role>('executive')
  const [filters, setFilters] = useState(defaultFilters)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  )
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [mobileChartTab, setMobileChartTab] = useState<MobileChartTab>('area')

  const copy = getDashboardCopy(language)
  const roleCopy = copy.roles[role]
  const dashboard = getDashboardSnapshot(filters, language, role)
  const localizedDateRangeOptions = getLocalizedOptions(language, 'dateRange', dateRangeOptions)
  const localizedAppOptions = getLocalizedOptions(language, 'app', appOptions)
  const localizedChannelOptions = getLocalizedOptions(language, 'channel', channelOptions)
  const localizedRegionOptions = getLocalizedOptions(language, 'region', regionOptions)
  const localizedRoleOptions = getLocalizedRoleOptions(language)
  const isMobile = viewportWidth < 768
  const isTablet = viewportWidth < 1280
  const languageOptions = [
    { value: 'en', label: copy.languages.en },
    { value: 'zh', label: copy.languages.zh },
  ] as const
  const activeFilterCount = (Object.keys(defaultFilters) as Array<keyof FilterState>).reduce(
    (count, key) => count + (filters[key] === defaultFilters[key] ? 0 : 1),
    0,
  )
  const mobileChartTabs = [
    { value: 'area', label: roleCopy.sections.areaEyebrow },
    { value: 'bar', label: roleCopy.sections.barEyebrow },
    { value: 'line', label: roleCopy.sections.lineEyebrow },
  ] as const
  const toolbarBadges = [
    { icon: ShieldCheck, label: copy.chrome.certified },
    { icon: RefreshCw, label: copy.chrome.updated },
    { icon: Database, label: copy.chrome.source },
  ] as const
  const activeScopeLabel = activeFilterCount
    ? dashboard.scopeBadges.slice(0, 2).join(' · ')
    : copy.mobile.defaultScope

  function updateFilter<Key extends keyof FilterState>(key: Key, value: FilterState[Key]) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function resetFilters() {
    setFilters(defaultFilters)
  }

  useEffect(() => {
    document.title = `${copy.pageTitle} · ${roleCopy.label}`
  }, [copy.pageTitle, roleCopy.label])

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsFilterSheetOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isFilterSheetOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isFilterSheetOpen])

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-14rem] h-[26rem] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_58%)]" />
      <div className="pointer-events-none absolute right-[-8rem] top-[14rem] h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {isMobile ? (
          <>
            <header className="mb-4 rounded-[22px] border border-white/10 bg-slate-950/65 p-3.5 shadow-[0_18px_40px_rgba(2,6,23,0.24)] backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {copy.chrome.breadcrumb}
                  </p>
                  <h1 className="mt-1.5 font-display text-lg font-semibold leading-tight text-white">
                    {copy.shell.title}
                  </h1>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">{copy.shell.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFilterSheetOpen(true)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-slate-200"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {copy.mobile.filters}
                  {activeFilterCount ? (
                    <span className="rounded-full bg-sky-400/20 px-1.5 py-0.5 text-[10px] text-sky-100">
                      {activeFilterCount}
                    </span>
                  ) : null}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {toolbarBadges.map((item) => (
                  <MetaBadge key={item.label} icon={item.icon} className="py-1 text-[11px]">
                    {item.label}
                  </MetaBadge>
                ))}
              </div>

              <div className="mt-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-2.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {copy.mobile.activeFilters}
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-300">
                  <Globe2 className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                  <span className="truncate text-sm">{activeScopeLabel}</span>
                </div>
              </div>

              <div className="mt-3 grid gap-3 min-[420px]:grid-cols-2">
                <MobileChipGroup
                  label={copy.mobile.view}
                  options={localizedRoleOptions}
                  value={role}
                  onChange={(value) => setRole(value as Role)}
                />
                <MobileChipGroup
                  label={copy.mobile.language}
                  options={languageOptions}
                  value={language}
                  onChange={(value) => setLanguage(value as Language)}
                  compact
                />
              </div>
            </header>

            <SurfaceCard className="overflow-hidden p-4" interactive={false}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_68%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100">
                  <TrendingUp className="h-4 w-4" />
                  {roleCopy.hero.badge}
                </div>

                <h2 className="mt-3 font-display text-[28px] font-semibold leading-[1.15] text-white">
                  {roleCopy.hero.title}
                </h2>
                <p className="mt-2.5 text-sm leading-6 text-slate-300">{roleCopy.hero.description}</p>

                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {dashboard.portfolioTable.headline}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {dashboard.scopeBadges.map((badge) => (
                    <div
                      key={badge}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200"
                    >
                      {badge}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 min-[420px]:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/60 p-3.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{dashboard.heroPanels.primary.label}</span>
                      <Sparkles className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">{dashboard.heroPanels.primary.value}</div>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{dashboard.heroPanels.primary.detail}</p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-slate-950/60 p-3.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{dashboard.heroPanels.secondary.label}</span>
                      <Clock3 className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">{dashboard.heroPanels.secondary.value}</div>
                    {dashboard.heroPanels.secondary.chip ? (
                      <div className="mt-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-300">
                        {dashboard.heroPanels.secondary.chip}
                      </div>
                    ) : null}
                    <p className="mt-2 text-xs leading-5 text-slate-400">{dashboard.heroPanels.secondary.detail}</p>
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <section className="mt-5">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{copy.mobile.summary}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{copy.sections.summaryTitle}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-400">{copy.sections.summaryDetail}</p>
              </div>
              <div className="grid gap-3">
                {dashboard.executiveSummary.map((item) => (
                  <SurfaceCard
                    key={item.title}
                    className="p-4"
                    interactive={false}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {item.title}
                        </div>
                        <div className="mt-2 text-[17px] font-semibold leading-6 text-white">{item.headline}</div>
                        <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
                      </div>
                      <div className="mt-0.5 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-sky-300/50 to-transparent" />
                    </div>
                  </SurfaceCard>
                ))}
              </div>
            </section>

            <section className="mt-5">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{copy.mobile.kpis}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{copy.sections.metricsTitle}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-400">{copy.sections.metricsDetail}</p>
              </div>
              <div className="grid gap-3 min-[360px]:grid-cols-2">
                {dashboard.metricCards.map((card) => (
                  <MetricCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    deltaLabel={card.deltaLabel}
                    trend={card.trend}
                    blurb={card.blurb}
                    tone={card.tone}
                    icon={metricIcons[card.iconKey]}
                    compact
                  />
                ))}
              </div>
            </section>

            <section className="mt-5">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{copy.mobile.insights}</p>
              </div>
              <MobileChipGroup
                options={mobileChartTabs}
                value={mobileChartTab}
                onChange={(value) => setMobileChartTab(value as MobileChartTab)}
              />
              <div className="mt-3">
                {mobileChartTab === 'area' ? (
                  <DashboardAreaPanel roleCopy={roleCopy} dashboard={dashboard} compact />
                ) : mobileChartTab === 'bar' ? (
                  <DashboardBarPanel roleCopy={roleCopy} dashboard={dashboard} compact isTablet={isTablet} />
                ) : (
                  <DashboardLinePanel roleCopy={roleCopy} dashboard={dashboard} compact />
                )}
              </div>
            </section>

            <section className="mt-5">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{copy.mobile.alerts}</p>
              </div>
              <AlertsPanel copy={copy} roleCopy={roleCopy} dashboard={dashboard} compact />
            </section>

            <section className="mt-5 pb-6">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{copy.mobile.portfolio}</p>
              </div>
              <PortfolioPanel copy={copy} roleCopy={roleCopy} dashboard={dashboard} compact />
            </section>

            {isFilterSheetOpen ? (
              <MobileFilterSheet
                copy={copy}
                filters={filters}
                dateOptions={localizedDateRangeOptions}
                appOptions={localizedAppOptions}
                channelOptions={localizedChannelOptions}
                regionOptions={localizedRegionOptions}
                onChange={updateFilter}
                onReset={resetFilters}
                onClose={() => setIsFilterSheetOpen(false)}
              />
            ) : null}
          </>
        ) : (
          <>
            <SurfaceCard className="mb-6 p-5 sm:p-6" interactive={false}>
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    <span>{copy.chrome.breadcrumb}</span>
                    <span className="text-slate-700">/</span>
                    <span>{roleCopy.label}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                      <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {copy.shell.title}
                      </h1>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{copy.shell.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {toolbarBadges.map((item) => (
                        <MetaBadge key={item.label} icon={item.icon}>
                          {item.label}
                        </MetaBadge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-end">
                  <SegmentedControl
                    label={copy.toolbar.role}
                    value={role}
                    options={localizedRoleOptions}
                    onChange={(value) => setRole(value as Role)}
                  />
                  <SegmentedControl
                    label={copy.toolbar.language}
                    value={language}
                    options={languageOptions}
                    onChange={(value) => setLanguage(value as Language)}
                  />
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="overflow-hidden p-5 sm:p-8" interactive={false}>
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_55%)] lg:block" />

              <div className="relative grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,420px)] xl:items-start">
                <div className="max-w-3xl">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                      <TrendingUp className="h-4 w-4" />
                      {roleCopy.hero.badge}
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {dashboard.portfolioTable.headline}
                    </div>
                  </div>

                  <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                    {roleCopy.hero.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                    {roleCopy.hero.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {dashboard.scopeBadges.map((badge) => (
                      <div
                        key={badge}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{dashboard.heroPanels.primary.label}</span>
                      <Sparkles className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-white">{dashboard.heroPanels.primary.value}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{dashboard.heroPanels.primary.detail}</p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{dashboard.heroPanels.secondary.label}</span>
                      <Clock3 className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-white">{dashboard.heroPanels.secondary.value}</div>
                    {dashboard.heroPanels.secondary.chip ? (
                      <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {dashboard.heroPanels.secondary.chip}
                      </div>
                    ) : null}
                    <p className="mt-3 text-sm leading-6 text-slate-400">{dashboard.heroPanels.secondary.detail}</p>
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="mt-6 p-5" interactive={false}>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <SectionLead
                  eyebrow={copy.mobile.filters}
                  title={copy.sections.filtersTitle}
                  detail={copy.sections.filtersDetail}
                />
                <div className="flex flex-wrap gap-2">
                  {dashboard.scopeBadges.map((badge) => (
                    <div
                      key={badge}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <FilterSelect
                  label={copy.filters.dateRange}
                  value={filters.dateRange}
                  options={localizedDateRangeOptions}
                  onChange={(value) => updateFilter('dateRange', value as DateRangeValue)}
                />
                <FilterSelect
                  label={copy.filters.app}
                  value={filters.app}
                  options={localizedAppOptions}
                  onChange={(value) => updateFilter('app', value as AppFilterValue)}
                />
                <FilterSelect
                  label={copy.filters.channel}
                  value={filters.channel}
                  options={localizedChannelOptions}
                  onChange={(value) => updateFilter('channel', value as ChannelValue)}
                />
                <FilterSelect
                  label={copy.filters.region}
                  value={filters.region}
                  options={localizedRegionOptions}
                  onChange={(value) => updateFilter('region', value as RegionValue)}
                />
              </div>
            </SurfaceCard>

            <section className="mt-6">
              <SectionLead
                eyebrow={copy.mobile.summary}
                title={copy.sections.summaryTitle}
                detail={copy.sections.summaryDetail}
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboard.executiveSummary.map((item) => (
                  <SurfaceCard key={item.title} className="p-5" interactive={false}>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {item.title}
                    </div>
                    <div className="mt-3 text-lg font-semibold leading-7 text-white">{item.headline}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
                  </SurfaceCard>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <SectionLead
                eyebrow={copy.mobile.kpis}
                title={copy.sections.metricsTitle}
                detail={copy.sections.metricsDetail}
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboard.metricCards.map((card) => (
                  <MetricCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    deltaLabel={card.deltaLabel}
                    trend={card.trend}
                    blurb={card.blurb}
                    tone={card.tone}
                    icon={metricIcons[card.iconKey]}
                  />
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
              <DashboardAreaPanel roleCopy={roleCopy} dashboard={dashboard} />
              <AlertsPanel copy={copy} roleCopy={roleCopy} dashboard={dashboard} />
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <DashboardBarPanel roleCopy={roleCopy} dashboard={dashboard} isTablet={isTablet} />
              <DashboardLinePanel roleCopy={roleCopy} dashboard={dashboard} />
            </section>

            <PortfolioPanel copy={copy} roleCopy={roleCopy} dashboard={dashboard} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
