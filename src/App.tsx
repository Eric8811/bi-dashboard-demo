import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CircleDollarSign,
  Clock3,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
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
  type DateRangeValue,
  type FilterState,
  type ValueFormat,
  type RegionValue,
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

function getYAxisWidth(format: ValueFormat, isMobile: boolean) {
  if (isMobile) {
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

function getBarAxisWidth(isMobile: boolean, isTablet: boolean) {
  if (isMobile) {
    return 86
  }

  if (isTablet) {
    return 112
  }

  return 148
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [role, setRole] = useState<Role>('executive')
  const [filters, setFilters] = useState(defaultFilters)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  )

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

  function updateFilter<Key extends keyof FilterState>(key: Key, value: FilterState[Key]) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
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

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-14rem] h-[26rem] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_58%)]" />
      <div className="pointer-events-none absolute right-[-8rem] top-[14rem] h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {copy.shell.subtitle}
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {copy.shell.title}
            </h1>
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
        </header>

        <SurfaceCard className="overflow-hidden p-5 sm:p-8" interactive={false}>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_55%)] lg:block" />

          <div className="relative grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,420px)] xl:items-start">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                <TrendingUp className="h-4 w-4" />
                {roleCopy.hero.badge}
              </div>

              <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight leading-tight text-white sm:text-5xl">
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
                <div className="mt-3 text-3xl font-semibold text-white">
                  {dashboard.heroPanels.primary.value}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {dashboard.heroPanels.primary.detail}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{dashboard.heroPanels.secondary.label}</span>
                  <Clock3 className="h-4 w-4 text-slate-500" />
                </div>
                <div className="mt-3 text-3xl font-semibold text-white">
                  {dashboard.heroPanels.secondary.value}
                </div>
                {dashboard.heroPanels.secondary.chip ? (
                  <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {dashboard.heroPanels.secondary.chip}
                  </div>
                ) : null}
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {dashboard.heroPanels.secondary.detail}
                </p>
              </div>
            </div>
          </div>
        </SurfaceCard>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboard.executiveSummary.map((item) => (
            <SurfaceCard key={item.title} className="p-5" interactive={false}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {item.title}
              </div>
              <div className="mt-3 text-lg font-semibold leading-7 text-white">{item.headline}</div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
            </SurfaceCard>
          ))}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
          <SurfaceCard className="p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                  {roleCopy.sections.areaEyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">{roleCopy.sections.areaTitle}</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                {dashboard.areaChart.headline}
              </div>
            </div>

            <div className="mt-6 h-64 sm:h-80">
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
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={getTickFormatter(dashboard.areaChart.format)}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: isMobile ? 11 : 12 }}
                    width={getYAxisWidth(dashboard.areaChart.format, isMobile)}
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

          <SurfaceCard className="p-6">
            <div className="border-b border-white/10 pb-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                {roleCopy.sections.alertsEyebrow}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">{roleCopy.sections.alertsTitle}</h3>
            </div>

            <div className="mt-6 space-y-4">
              {dashboard.alerts.map((alert) => (
                <article
                  key={alert.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 transition duration-300 hover:border-white/15 hover:bg-slate-950/65"
                >
                  <div className="flex items-start justify-between gap-4">
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
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${alertStyles[alert.severity]}`}
                    >
                      {copy.severityLabels[alert.severity]}
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    <span className="font-medium text-white">{roleCopy.sections.actionLabel}</span>{' '}
                    {alert.action}
                  </div>
                </article>
              ))}
            </div>
          </SurfaceCard>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <SurfaceCard className="p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                  {roleCopy.sections.barEyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">{roleCopy.sections.barTitle}</h3>
              </div>
              <div className="text-sm text-slate-400">{roleCopy.sections.barSubtitle}</div>
            </div>

            <div className="mt-6 h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboard.barChart.data}
                  layout="vertical"
                  margin={{ left: isMobile ? 4 : 18, right: isMobile ? 6 : 12 }}
                >
                  <CartesianGrid horizontal={false} stroke="rgba(148, 163, 184, 0.14)" />
                  <XAxis
                    type="number"
                    tickFormatter={getTickFormatter(dashboard.barChart.format)}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: isMobile ? 11 : 12 }}
                  />
                  <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#cbd5e1', fontSize: isMobile ? 11 : 12 }}
                    width={getBarAxisWidth(isMobile, isTablet)}
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

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {dashboard.barChart.data.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 transition duration-300 hover:border-white/15 hover:bg-slate-950/60"
                >
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{item.label}</span>
                    <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
                      {item.chip}
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{item.valueLabel}</div>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                  {roleCopy.sections.lineEyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">{roleCopy.sections.lineTitle}</h3>
              </div>
              <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100">
                {dashboard.lineChart.badge}
              </div>
            </div>

            <div className="mt-6 h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboard.lineChart.data}>
                  <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, 0.14)" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={getTickFormatter(dashboard.lineChart.format)}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: isMobile ? 11 : 12 }}
                    width={getYAxisWidth(dashboard.lineChart.format, isMobile)}
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

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
        </section>

        <SurfaceCard className="mt-6 p-6">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                {roleCopy.sections.tableEyebrow}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">{roleCopy.sections.tableTitle}</h3>
            </div>
            <div className="text-sm text-slate-400">{dashboard.portfolioTable.headline}</div>
          </div>

          <div className="mt-6">
            <PortfolioTable
              columns={dashboard.portfolioTable.columns}
              rows={dashboard.portfolioTable.rows}
              emptyMessage={dashboard.portfolioTable.emptyMessage}
            />
          </div>
        </SurfaceCard>
      </main>
    </div>
  )
}

export default App
