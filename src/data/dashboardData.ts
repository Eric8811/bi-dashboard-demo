import { getDashboardCopy, type Language, type Role } from './dashboardCopy'

export const dateRangeOptions = [{ value: '30d' }, { value: 'qtd' }, { value: '6m' }] as const

export const appOptions = [
  { value: 'all' },
  { value: 'atlas-home' },
  { value: 'pulsepath' },
  { value: 'creator-studio' },
  { value: 'ledger-flow' },
  { value: 'nurture-loop' },
  { value: 'travel-scout' },
] as const

export const channelOptions = [
  { value: 'all' },
  { value: 'organic' },
  { value: 'paid-social' },
  { value: 'search-ads' },
  { value: 'lifecycle-crm' },
  { value: 'creator-partnerships' },
] as const

export const regionOptions = [
  { value: 'all' },
  { value: 'na' },
  { value: 'emea' },
  { value: 'apac' },
  { value: 'latam' },
] as const

export type DateRangeValue = (typeof dateRangeOptions)[number]['value']
export type AppFilterValue = (typeof appOptions)[number]['value']
export type ChannelValue = (typeof channelOptions)[number]['value']
export type RegionValue = (typeof regionOptions)[number]['value']

export type Tone = 'sky' | 'emerald' | 'amber' | 'rose'
export type Trend = 'up' | 'down' | 'flat'
export type ValueFormat = 'currency' | 'percent' | 'roi' | 'count'
export type AppStatus =
  | 'In Development'
  | 'Waiting for Review'
  | 'Live'
  | 'Scaling'
  | 'Paused'
export type RiskSeverity = 'low' | 'medium' | 'high'
export type AlertSeverity = 'high' | 'medium' | 'watch'
export type PortfolioTableCellTone = 'slate' | 'sky' | 'emerald' | 'amber' | 'rose'

type RiskFlagKey =
  | 'healthy'
  | 'concentration'
  | 'retention'
  | 'review'
  | 'monetization'
  | 'paused'
type DropOffKey =
  | 'paywall_step3'
  | 'onboarding_step2'
  | 'template_picker'
  | 'permissions_gate'
  | 'trial_copy'
  | 'search_blank_state'
type IssueFlagKey =
  | 'revenue_mix_skew'
  | 'release_retention_regression'
  | 'healthy_signal'
  | 'review_queue_pressure'
  | 'activation_gap'
  | 'paused_efficiency'
type SuggestedActionKey =
  | 'trim_paid_social_mix'
  | 'rollback_onboarding_order'
  | 'extend_partner_tests'
  | 'clear_qa_signoff'
  | 'tighten_trial_copy'
  | 'hold_spend_cleanup'
type ReviewStageKey =
  | 'live_monitoring'
  | 'hotfix_review'
  | 'live_scaling'
  | 'waiting_review'
  | 'qa_pass'
  | 'paused_queue'
type QueueStateKey =
  | 'clear'
  | 'review_48h'
  | 'partner_ready'
  | 'metadata_hold'
  | 'cross_team_wait'
  | 'paused'
type ChannelStatusKey =
  | 'creative_aging'
  | 'tiktok_uk_soft'
  | 'partner_fresh'
  | 'asa_stable'
  | 'crm_soft'
  | 'spend_paused'
type DelayFlagKey = 'none' | 'hotfix_hold' | 'review_risk' | 'copy_delay' | 'paused_launch'
type BlockerKey =
  | 'creative_refresh'
  | 'android_hotfix'
  | 'none'
  | 'qa_signoff'
  | 'pricing_copy'
  | 'demand_pause'
type NextActionKey =
  | 'approve_refresh'
  | 'ship_patch'
  | 'open_next_test'
  | 'escalate_review'
  | 'lock_trial_copy'
  | 'close_pause_items'
type ChannelPillKey = 'strong' | 'mixed' | 'weak'
type AlertKey =
  | 'concentration'
  | 'backlog'
  | 'pausedSpend'
  | 'retentionDrop'
  | 'activationGap'
  | 'releaseTradeoff'
  | 'reviewSla'
  | 'creativeRefresh'
  | 'handoffDelay'

export type FilterState = {
  dateRange: DateRangeValue
  app: AppFilterValue
  channel: ChannelValue
  region: RegionValue
}

type MetricCardData = {
  title: string
  value: string
  deltaLabel: string
  trend: Trend
  blurb: string
  tone: Tone
  iconKey:
    | 'revenue'
    | 'efficiency'
    | 'retention'
    | 'release'
    | 'risk'
    | 'backlog'
    | 'activation'
    | 'operations'
}

type ExecutiveSummaryItem = {
  title: string
  headline: string
  detail: string
}

type HeroPanel = {
  label: string
  value: string
  detail: string
  chip?: string
}

type AreaPoint = {
  label: string
  primary: number
  secondary: number
}

type BarPoint = {
  label: string
  metric: number
  chip: string
  valueLabel: string
}

type LinePoint = {
  label: string
  first: number
  second: number
}

type StatCard = {
  label: string
  value: string
  detail: string
}

type PortfolioAlert = {
  title: string
  detail: string
  action: string
  severity: AlertSeverity
}

export type PortfolioTableColumn = {
  key: string
  label: string
  align?: 'left' | 'right'
}

export type PortfolioTableCell =
  | {
      kind: 'app'
      primary: string
      secondary: string
    }
  | {
      kind: 'text'
      primary: string
      secondary?: string
      tone?: 'default' | 'muted'
    }
  | {
      kind: 'metric'
      primary: string
      secondary?: string
      tone?: 'default' | 'positive' | 'warning' | 'negative'
    }
  | {
      kind: 'badge'
      primary: string
      tone: PortfolioTableCellTone
      raw?: string
    }

export type PortfolioTableRow = {
  id: string
  cells: Record<string, PortfolioTableCell>
}

export type DashboardSnapshot = {
  scopeBadges: string[]
  heroPanels: {
    primary: HeroPanel
    secondary: HeroPanel
  }
  executiveSummary: ExecutiveSummaryItem[]
  metricCards: MetricCardData[]
  areaChart: {
    headline: string
    format: ValueFormat
    data: AreaPoint[]
  }
  alerts: PortfolioAlert[]
  barChart: {
    format: ValueFormat
    data: BarPoint[]
  }
  lineChart: {
    badge: string
    format: ValueFormat
    data: LinePoint[]
    stats: StatCard[]
  }
  portfolioTable: {
    columns: PortfolioTableColumn[]
    rows: PortfolioTableRow[]
    headline: string
    emptyMessage: string
  }
}

type PortfolioApp = {
  id: string
  name: string
  category: string
  status: AppStatus
  installs: number
  activationRate: number
  ctr: number
  d1Retention: number
  d7Retention: number
  d30Retention: number
  payerConversion: number
  revenue: number
  roi: number
  releaseImpact: number
  lastReleaseAt: string
  riskFlag: RiskFlagKey
  riskSeverity: RiskSeverity
  reviewStage: ReviewStageKey
  queueState: QueueStateKey
  channelStatus: ChannelStatusKey
  channelPill: ChannelPillKey
  delayFlag: DelayFlagKey
  blocker: BlockerKey
  nextAction: NextActionKey
  dropOff: DropOffKey
  issueFlag: IssueFlagKey
  suggestedAction: SuggestedActionKey
  queueDays: number
  issueSlaHours: number
  channels: ChannelValue[]
  regions: RegionValue[]
}

type ChannelPerformanceBase = {
  channel: ChannelValue
  roi: number
  activationRate: number
  ctr: number
  executionHealth: number
}

type ChannelSnapshot = {
  key: ChannelValue
  label: string
  roi: number
  activationRate: number
  ctr: number
  executionHealth: number
  channelPill: ChannelPillKey
}

type ScaledPortfolioApp = PortfolioApp & {
  revenueShare: number
}

type DashboardContext = {
  language: Language
  filters: FilterState
  copy: ReturnType<typeof getDashboardCopy>
  scopeLabel: string
  channelLabel: string
  regionLabel: string
  dateRangeLabel: string
  scopeBadges: string[]
  matchingRows: ScaledPortfolioApp[]
  summaryRows: ScaledPortfolioApp[]
  channelPerformance: ChannelSnapshot[]
  revenueTrend: AreaPoint[]
  releaseTrend: AreaPoint[]
  opsLaunchTrend: AreaPoint[]
  executiveLineTrend: LinePoint[]
  pmLineTrend: LinePoint[]
  opsQueueTrend: LinePoint[]
  totalRevenue: number
  averageRoi: number
  averageActivationRate: number
  averageD1Retention: number
  averageD7Retention: number
  averageD30Retention: number
  averagePayerConversion: number
  averageReleaseImpact: number
  averageIssueSlaHours: number
  healthScore: number
  funnelFriction: number
  topTwoShare: number
  waitingForReview: number
  liveOrScaling: number
  pausedApps: number
  healthyApps: number
  appsInReview: number
  delayedApps: number
  blockedApps: number
  reviewBeyondSla: number
  launchesShipped: number
  launchTarget: number
  issueSlaRate: number
  topRevenueApp: ScaledPortfolioApp
  topRoiApp: ScaledPortfolioApp
  hotspotApp: ScaledPortfolioApp
  secondHotspotApp: ScaledPortfolioApp
  blockedApp: ScaledPortfolioApp
  bestChannel: ChannelSnapshot
  weakestActivationChannel: ChannelSnapshot
  weakestExecutionChannel: ChannelSnapshot
}

type AlertDefinition = {
  key: AlertKey
  severity: AlertSeverity
  apps: readonly AppFilterValue[]
  channels: readonly ChannelValue[]
  regions: readonly RegionValue[]
}

const dateRangeSettings = {
  '30d': { monthCount: 3, revenueMultiplier: 0.42, installMultiplier: 0.38, growthShift: -1.2 },
  qtd: { monthCount: 3, revenueMultiplier: 1, installMultiplier: 1, growthShift: 0 },
  '6m': { monthCount: 6, revenueMultiplier: 1.78, installMultiplier: 1.72, growthShift: 1.7 },
} as const

const appFactors: Record<
  AppFilterValue,
  { revenue: number; roi: number; retention: number; release: number }
> = {
  all: { revenue: 1, roi: 1, retention: 1, release: 1 },
  'atlas-home': { revenue: 1.14, roi: 1.03, retention: 0.98, release: 1.08 },
  pulsepath: { revenue: 0.92, roi: 1.05, retention: 1.01, release: 0.94 },
  'creator-studio': { revenue: 0.88, roi: 1.16, retention: 1.04, release: 1.12 },
  'ledger-flow': { revenue: 0.74, roi: 0.96, retention: 0.99, release: 1.03 },
  'nurture-loop': { revenue: 0.56, roi: 0.84, retention: 0.95, release: 1.15 },
  'travel-scout': { revenue: 0.48, roi: 0.76, retention: 0.88, release: 0.72 },
}

const channelFactors: Record<
  ChannelValue,
  { revenue: number; roi: number; retention: number; release: number }
> = {
  all: { revenue: 1, roi: 1, retention: 1, release: 1 },
  organic: { revenue: 1.08, roi: 1.18, retention: 1.05, release: 1.02 },
  'paid-social': { revenue: 0.94, roi: 0.82, retention: 0.93, release: 0.95 },
  'search-ads': { revenue: 1.02, roi: 0.98, retention: 0.97, release: 1.01 },
  'lifecycle-crm': { revenue: 1.1, roi: 1.14, retention: 1.06, release: 1.03 },
  'creator-partnerships': { revenue: 0.98, roi: 1.08, retention: 1.02, release: 1.07 },
}

const regionFactors: Record<
  RegionValue,
  { revenue: number; roi: number; retention: number; release: number }
> = {
  all: { revenue: 1, roi: 1, retention: 1, release: 1 },
  na: { revenue: 1.08, roi: 1.04, retention: 1.02, release: 1.03 },
  emea: { revenue: 0.96, roi: 1.01, retention: 1, release: 0.99 },
  apac: { revenue: 0.91, roi: 0.96, retention: 0.98, release: 1.05 },
  latam: { revenue: 0.74, roi: 0.82, retention: 0.9, release: 0.92 },
}

const monthlyRevenueBase = [
  { month: 'Jan', primary: 1_740_000, secondary: 1_680_000 },
  { month: 'Feb', primary: 1_820_000, secondary: 1_760_000 },
  { month: 'Mar', primary: 1_960_000, secondary: 1_880_000 },
  { month: 'Apr', primary: 2_160_000, secondary: 2_060_000 },
  { month: 'May', primary: 2_340_000, secondary: 2_220_000 },
  { month: 'Jun', primary: 2_600_000, secondary: 2_440_000 },
] as const

const releaseLiftBase = [
  { month: 'Jan', primary: 9.1, secondary: 8.6 },
  { month: 'Feb', primary: 10.2, secondary: 9.4 },
  { month: 'Mar', primary: 11.7, secondary: 10.8 },
  { month: 'Apr', primary: 12.4, secondary: 11.5 },
  { month: 'May', primary: 13.3, secondary: 12.1 },
  { month: 'Jun', primary: 14.1, secondary: 12.9 },
] as const

const opsLaunchBase = [
  { month: 'Jan', primary: 5, secondary: 6 },
  { month: 'Feb', primary: 6, secondary: 6 },
  { month: 'Mar', primary: 7, secondary: 7 },
  { month: 'Apr', primary: 7, secondary: 8 },
  { month: 'May', primary: 8, secondary: 8 },
  { month: 'Jun', primary: 9, secondary: 9 },
] as const

const channelPerformanceBase: ChannelPerformanceBase[] = [
  { channel: 'organic', roi: 5.9, activationRate: 29, ctr: 2.7, executionHealth: 86 },
  { channel: 'lifecycle-crm', roi: 5.2, activationRate: 25, ctr: 2.1, executionHealth: 75 },
  { channel: 'search-ads', roi: 4.2, activationRate: 19, ctr: 2.5, executionHealth: 82 },
  {
    channel: 'creator-partnerships',
    roi: 3.7,
    activationRate: 21,
    ctr: 3.1,
    executionHealth: 89,
  },
  { channel: 'paid-social', roi: 2.8, activationRate: 14, ctr: 4.4, executionHealth: 68 },
]

const executiveLineBase = [
  { month: 'Jan', first: 28.1, second: 5.6 },
  { month: 'Feb', first: 28.9, second: 5.9 },
  { month: 'Mar', first: 29.5, second: 6.2 },
  { month: 'Apr', first: 30.1, second: 6.4 },
  { month: 'May', first: 30.8, second: 6.9 },
  { month: 'Jun', first: 31.4, second: 7.2 },
] as const

const pmLineBase = [
  { month: 'Jan', first: 39.6, second: 23.4 },
  { month: 'Feb', first: 40.4, second: 24.1 },
  { month: 'Mar', first: 41.8, second: 24.7 },
  { month: 'Apr', first: 42.9, second: 25.4 },
  { month: 'May', first: 43.3, second: 26.1 },
  { month: 'Jun', first: 44.1, second: 26.7 },
] as const

const opsQueueBase = [
  { month: 'Jan', first: 3, second: 1 },
  { month: 'Feb', first: 4, second: 2 },
  { month: 'Mar', first: 4, second: 2 },
  { month: 'Apr', first: 5, second: 3 },
  { month: 'May', first: 4, second: 2 },
  { month: 'Jun', first: 3, second: 1 },
] as const

const frictionWeights: Record<DropOffKey, number> = {
  paywall_step3: 28,
  onboarding_step2: 36,
  template_picker: 24,
  permissions_gate: 27,
  trial_copy: 31,
  search_blank_state: 34,
}

const portfolioApps: PortfolioApp[] = [
  {
    id: 'atlas-home',
    name: 'Atlas Home',
    category: 'Connected home subscription',
    status: 'Scaling',
    installs: 184_000,
    activationRate: 32.4,
    ctr: 2.7,
    d1Retention: 46.2,
    d7Retention: 28.7,
    d30Retention: 33.8,
    payerConversion: 8.4,
    revenue: 2_480_000,
    roi: 4.8,
    releaseImpact: 18.4,
    lastReleaseAt: '2026-03-24',
    riskFlag: 'concentration',
    riskSeverity: 'high',
    reviewStage: 'live_scaling',
    queueState: 'partner_ready',
    channelStatus: 'creative_aging',
    channelPill: 'mixed',
    delayFlag: 'none',
    blocker: 'creative_refresh',
    nextAction: 'approve_refresh',
    dropOff: 'paywall_step3',
    issueFlag: 'revenue_mix_skew',
    suggestedAction: 'trim_paid_social_mix',
    queueDays: 0,
    issueSlaHours: 18,
    channels: ['organic', 'paid-social', 'lifecycle-crm'],
    regions: ['na', 'emea'],
  },
  {
    id: 'pulsepath',
    name: 'PulsePath',
    category: 'Health coaching membership',
    status: 'Live',
    installs: 136_000,
    activationRate: 16.2,
    ctr: 4.4,
    d1Retention: 41.3,
    d7Retention: 22.8,
    d30Retention: 29.2,
    payerConversion: 7.3,
    revenue: 1_760_000,
    roi: 3.9,
    releaseImpact: 9.6,
    lastReleaseAt: '2026-03-18',
    riskFlag: 'retention',
    riskSeverity: 'high',
    reviewStage: 'hotfix_review',
    queueState: 'review_48h',
    channelStatus: 'tiktok_uk_soft',
    channelPill: 'weak',
    delayFlag: 'hotfix_hold',
    blocker: 'android_hotfix',
    nextAction: 'ship_patch',
    dropOff: 'onboarding_step2',
    issueFlag: 'release_retention_regression',
    suggestedAction: 'rollback_onboarding_order',
    queueDays: 3,
    issueSlaHours: 27,
    channels: ['paid-social', 'search-ads', 'organic'],
    regions: ['na', 'apac'],
  },
  {
    id: 'creator-studio',
    name: 'Creator Studio',
    category: 'Workflow tools for creators',
    status: 'Scaling',
    installs: 92_000,
    activationRate: 27.6,
    ctr: 3.1,
    d1Retention: 43.5,
    d7Retention: 26.4,
    d30Retention: 31.1,
    payerConversion: 8.1,
    revenue: 1_340_000,
    roi: 5.4,
    releaseImpact: 21.7,
    lastReleaseAt: '2026-03-12',
    riskFlag: 'healthy',
    riskSeverity: 'low',
    reviewStage: 'live_scaling',
    queueState: 'partner_ready',
    channelStatus: 'partner_fresh',
    channelPill: 'strong',
    delayFlag: 'none',
    blocker: 'none',
    nextAction: 'open_next_test',
    dropOff: 'template_picker',
    issueFlag: 'healthy_signal',
    suggestedAction: 'extend_partner_tests',
    queueDays: 0,
    issueSlaHours: 14,
    channels: ['creator-partnerships', 'organic', 'lifecycle-crm'],
    regions: ['na', 'emea', 'apac'],
  },
  {
    id: 'ledger-flow',
    name: 'Ledger Flow',
    category: 'Finance and invoicing suite',
    status: 'Waiting for Review',
    installs: 51_000,
    activationRate: 18.8,
    ctr: 2.1,
    d1Retention: 38.1,
    d7Retention: 20.4,
    d30Retention: 27.8,
    payerConversion: 6.4,
    revenue: 870_000,
    roi: 3.2,
    releaseImpact: 12.1,
    lastReleaseAt: '2026-03-29',
    riskFlag: 'review',
    riskSeverity: 'medium',
    reviewStage: 'waiting_review',
    queueState: 'metadata_hold',
    channelStatus: 'asa_stable',
    channelPill: 'mixed',
    delayFlag: 'review_risk',
    blocker: 'qa_signoff',
    nextAction: 'escalate_review',
    dropOff: 'permissions_gate',
    issueFlag: 'review_queue_pressure',
    suggestedAction: 'clear_qa_signoff',
    queueDays: 4,
    issueSlaHours: 21,
    channels: ['search-ads', 'lifecycle-crm'],
    regions: ['emea', 'apac'],
  },
  {
    id: 'nurture-loop',
    name: 'Nurture Loop',
    category: 'CRM automation beta',
    status: 'In Development',
    installs: 18_000,
    activationRate: 21.1,
    ctr: 2.9,
    d1Retention: 35.4,
    d7Retention: 18.9,
    d30Retention: 24.9,
    payerConversion: 4.8,
    revenue: 440_000,
    roi: 1.9,
    releaseImpact: 15.3,
    lastReleaseAt: '2026-03-27',
    riskFlag: 'monetization',
    riskSeverity: 'medium',
    reviewStage: 'qa_pass',
    queueState: 'cross_team_wait',
    channelStatus: 'crm_soft',
    channelPill: 'mixed',
    delayFlag: 'copy_delay',
    blocker: 'pricing_copy',
    nextAction: 'lock_trial_copy',
    dropOff: 'trial_copy',
    issueFlag: 'activation_gap',
    suggestedAction: 'tighten_trial_copy',
    queueDays: 2,
    issueSlaHours: 23,
    channels: ['organic', 'creator-partnerships'],
    regions: ['na', 'latam'],
  },
  {
    id: 'travel-scout',
    name: 'Travel Scout',
    category: 'Trip planning marketplace',
    status: 'Paused',
    installs: 27_000,
    activationRate: 12.9,
    ctr: 1.8,
    d1Retention: 22.6,
    d7Retention: 11.6,
    d30Retention: 16.8,
    payerConversion: 3.1,
    revenue: 210_000,
    roi: 0.8,
    releaseImpact: -6.8,
    lastReleaseAt: '2026-02-14',
    riskFlag: 'paused',
    riskSeverity: 'high',
    reviewStage: 'paused_queue',
    queueState: 'paused',
    channelStatus: 'spend_paused',
    channelPill: 'weak',
    delayFlag: 'paused_launch',
    blocker: 'demand_pause',
    nextAction: 'close_pause_items',
    dropOff: 'search_blank_state',
    issueFlag: 'paused_efficiency',
    suggestedAction: 'hold_spend_cleanup',
    queueDays: 1,
    issueSlaHours: 35,
    channels: ['paid-social', 'search-ads'],
    regions: ['emea', 'latam'],
  },
]

const roleAlerts: Record<Role, readonly AlertDefinition[]> = {
  executive: [
    {
      key: 'concentration',
      severity: 'high',
      apps: ['all', 'atlas-home', 'creator-studio'],
      channels: ['all', 'organic', 'lifecycle-crm'],
      regions: ['all', 'na', 'emea'],
    },
    {
      key: 'backlog',
      severity: 'medium',
      apps: ['all', 'ledger-flow', 'nurture-loop'],
      channels: ['all', 'search-ads', 'lifecycle-crm'],
      regions: ['all', 'emea', 'apac'],
    },
    {
      key: 'pausedSpend',
      severity: 'watch',
      apps: ['all', 'travel-scout'],
      channels: ['all', 'paid-social', 'search-ads'],
      regions: ['all', 'emea', 'latam'],
    },
  ],
  pm: [
    {
      key: 'retentionDrop',
      severity: 'high',
      apps: ['all', 'pulsepath'],
      channels: ['all', 'paid-social', 'search-ads'],
      regions: ['all', 'na', 'apac'],
    },
    {
      key: 'activationGap',
      severity: 'medium',
      apps: ['all', 'pulsepath', 'nurture-loop'],
      channels: ['all', 'paid-social'],
      regions: ['all', 'na', 'emea'],
    },
    {
      key: 'releaseTradeoff',
      severity: 'watch',
      apps: ['all', 'pulsepath', 'atlas-home'],
      channels: ['all', 'organic', 'paid-social'],
      regions: ['all', 'na', 'emea'],
    },
  ],
  ops: [
    {
      key: 'reviewSla',
      severity: 'high',
      apps: ['all', 'ledger-flow', 'pulsepath'],
      channels: ['all', 'search-ads', 'lifecycle-crm'],
      regions: ['all', 'emea', 'apac'],
    },
    {
      key: 'creativeRefresh',
      severity: 'medium',
      apps: ['all', 'atlas-home'],
      channels: ['all', 'paid-social', 'organic'],
      regions: ['all', 'na', 'emea'],
    },
    {
      key: 'handoffDelay',
      severity: 'watch',
      apps: ['all', 'nurture-loop'],
      channels: ['all', 'creator-partnerships', 'lifecycle-crm'],
      regions: ['all', 'na', 'latam'],
    },
  ],
}

export const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

function getDateFormatter(language: Language) {
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function round(value: number, digits = 1) {
  const factor = 10 ** digits

  return Math.round(value * factor) / factor
}

function average(values: number[]) {
  return values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : 0
}

function weightedAverage(values: number[], weights: number[]) {
  const totalWeight = weights.reduce((total, value) => total + value, 0)

  if (!totalWeight) {
    return average(values)
  }

  const weightedTotal = values.reduce(
    (total, value, index) => total + value * (weights[index] ?? 0),
    0,
  )

  return weightedTotal / totalWeight
}

function matchesSelection<T extends string>(selected: T, values: readonly T[]) {
  if (selected === 'all') {
    return true
  }

  return values.includes(selected) || values.includes('all' as T)
}

function matchesPortfolioRow(app: PortfolioApp, filters: FilterState) {
  const appMatch = filters.app === 'all' || app.id === filters.app
  const channelMatch = filters.channel === 'all' || app.channels.includes(filters.channel)
  const regionMatch = filters.region === 'all' || app.regions.includes(filters.region)

  return appMatch && channelMatch && regionMatch
}

function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`
}

function formatSignedPercent(value: number, digits = 1) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`
}

function formatSignedPoints(value: number, language: Language, digits = 1) {
  const label = `${value >= 0 ? '+' : ''}${value.toFixed(digits)}`

  return language === 'zh' ? `${label}点` : `${label} pts`
}

function formatSignedCount(value: number, language: Language) {
  const normalized = Math.round(value)
  const label = `${normalized >= 0 ? '+' : ''}${normalized}`

  return language === 'zh' ? `较目标 ${label}` : `${label} vs target`
}

function formatRoi(value: number, digits = 1) {
  return `${value.toFixed(digits)}x`
}

function formatDate(isoDate: string, language: Language) {
  return getDateFormatter(language).format(new Date(`${isoDate}T00:00:00Z`))
}

function labelForCount(language: Language, count: number, singular: string, plural: string) {
  if (language === 'zh') {
    return `${count}`
  }

  return `${count} ${count === 1 ? singular : plural}`
}

function getSlaLabel(language: Language, rate: number) {
  return language === 'zh' ? `${rate}% 达标` : `${rate}% within SLA`
}

function getOpsQueueLabel(language: Language, backlog: number) {
  if (language === 'zh') {
    return backlog > 0 ? `${backlog} 个在审核` : '审核已清'
  }

  return backlog > 0 ? `${backlog} apps in review` : 'review queue clear'
}

function getExecutionTone(score: number): PortfolioTableCellTone {
  if (score >= 84) {
    return 'emerald'
  }

  if (score >= 74) {
    return 'amber'
  }

  return 'rose'
}

function getRiskTone(severity: RiskSeverity): PortfolioTableCellTone {
  if (severity === 'low') {
    return 'emerald'
  }

  if (severity === 'medium') {
    return 'amber'
  }

  return 'rose'
}

function getMetricTone(value: number, positiveThreshold: number, warningThreshold: number) {
  if (value >= positiveThreshold) {
    return 'positive' as const
  }

  if (value >= warningThreshold) {
    return 'warning' as const
  }

  return 'negative' as const
}

function getStatusTone(status: AppStatus): PortfolioTableCellTone {
  if (status === 'Scaling') {
    return 'sky'
  }

  if (status === 'Live') {
    return 'emerald'
  }

  if (status === 'Waiting for Review') {
    return 'amber'
  }

  if (status === 'Paused') {
    return 'rose'
  }

  return 'slate'
}

function createAppCell(primary: string, secondary: string): PortfolioTableCell {
  return {
    kind: 'app',
    primary,
    secondary,
  }
}

function createTextCell(
  primary: string,
  secondary?: string,
  tone: 'default' | 'muted' = 'default',
): PortfolioTableCell {
  return {
    kind: 'text',
    primary,
    secondary,
    tone,
  }
}

function createMetricCell(
  primary: string,
  secondary?: string,
  tone: 'default' | 'positive' | 'warning' | 'negative' = 'default',
): PortfolioTableCell {
  return {
    kind: 'metric',
    primary,
    secondary,
    tone,
  }
}

function createBadgeCell(
  primary: string,
  tone: PortfolioTableCellTone,
  raw?: string,
): PortfolioTableCell {
  return {
    kind: 'badge',
    primary,
    tone,
    raw,
  }
}

function getProductPriorityScore(app: ScaledPortfolioApp) {
  const issueBonus = {
    revenue_mix_skew: 4,
    release_retention_regression: 12,
    healthy_signal: 0,
    review_queue_pressure: 7,
    activation_gap: 8,
    paused_efficiency: 10,
  }[app.issueFlag]

  return issueBonus + (100 - app.d7Retention) * 0.6 + (100 - app.activationRate) * 0.35 - app.releaseImpact * 0.12
}

function getOpsPriorityScore(app: ScaledPortfolioApp) {
  const blockerBonus = app.blocker === 'none' ? 0 : 8
  const delayBonus = app.delayFlag === 'none' ? 0 : 6
  const queueBonus = app.queueDays * 1.4

  return blockerBonus + delayBonus + queueBonus + (100 - app.roi) * 0.04
}

function sortByDescending<T>(items: T[], selector: (item: T) => number) {
  return [...items].sort((left, right) => selector(right) - selector(left))
}

function buildChartSeries(
  points: readonly { month: string; primary: number; secondary: number }[],
  monthCount: number,
  labelMap: Record<string, string>,
  transform: (point: { month: string; primary: number; secondary: number }) => AreaPoint,
) {
  return points.slice(-monthCount).map((point) => ({
    ...transform(point),
    label: labelMap[point.month] ?? point.month,
  }))
}

function buildLineSeries(
  points: readonly { month: string; first: number; second: number }[],
  monthCount: number,
  labelMap: Record<string, string>,
  transform: (point: { month: string; first: number; second: number }) => LinePoint,
) {
  return points.slice(-monthCount).map((point) => ({
    ...transform(point),
    label: labelMap[point.month] ?? point.month,
  }))
}

function getRoleAlerts(
  role: Role,
  filters: FilterState,
  copy: ReturnType<typeof getDashboardCopy>,
) {
  const localizedAlertCopy = copy.alerts[role] as Record<
    AlertKey,
    { title: string; detail: string; action: string }
  >

  const localizedAlerts = roleAlerts[role]
    .filter(
      (alert) =>
        matchesSelection(filters.app, alert.apps) &&
        matchesSelection(filters.channel, alert.channels) &&
        matchesSelection(filters.region, alert.regions),
    )
    .map((alert) => ({
      title: localizedAlertCopy[alert.key].title,
      detail: localizedAlertCopy[alert.key].detail,
      action: localizedAlertCopy[alert.key].action,
      severity: alert.severity,
    }))

  return localizedAlerts.length
    ? localizedAlerts
    : roleAlerts[role].map((alert) => ({
        title: localizedAlertCopy[alert.key].title,
        detail: localizedAlertCopy[alert.key].detail,
        action: localizedAlertCopy[alert.key].action,
        severity: alert.severity,
      }))
}

function createDashboardContext(filters: FilterState, language: Language): DashboardContext {
  const copy = getDashboardCopy(language)
  const dateRange = dateRangeSettings[filters.dateRange]
  const appFactor = appFactors[filters.app]
  const channelFactor = channelFactors[filters.channel]
  const regionFactor = regionFactors[filters.region]

  const revenueMultiplier =
    dateRange.revenueMultiplier * appFactor.revenue * channelFactor.revenue * regionFactor.revenue
  const installsMultiplier =
    dateRange.installMultiplier * appFactor.revenue * channelFactor.revenue * regionFactor.revenue
  const roiMultiplier = appFactor.roi * channelFactor.roi * regionFactor.roi
  const retentionMultiplier = appFactor.retention * channelFactor.retention * regionFactor.retention
  const releaseMultiplier = appFactor.release * channelFactor.release * regionFactor.release

  const scaledApps = portfolioApps.map((app) => ({
    ...app,
    installs: Math.round(app.installs * installsMultiplier),
    activationRate: round(app.activationRate * retentionMultiplier),
    ctr: round(app.ctr * clamp(channelFactor.revenue * regionFactor.revenue, 0.85, 1.12), 1),
    d1Retention: round(app.d1Retention * retentionMultiplier),
    d7Retention: round(app.d7Retention * retentionMultiplier),
    d30Retention: round(app.d30Retention * retentionMultiplier),
    payerConversion: round(app.payerConversion * retentionMultiplier),
    revenue: Math.round(app.revenue * revenueMultiplier),
    roi: round(app.roi * roiMultiplier),
    releaseImpact: round(app.releaseImpact * releaseMultiplier),
    queueDays: Math.max(0, Math.round(app.queueDays * clamp(1.08 - releaseMultiplier * 0.04, 0.8, 1.15))),
    issueSlaHours: round(app.issueSlaHours * clamp(1.05 - roiMultiplier * 0.03, 0.88, 1.12)),
    revenueShare: 0,
  }))

  const matchingRows = scaledApps.filter((app) => matchesPortfolioRow(app, filters))
  const summaryRows = matchingRows.length ? matchingRows : scaledApps
  const totalRevenue = summaryRows.reduce((total, row) => total + row.revenue, 0)
  const rowsWithShare = scaledApps.map((app) => ({
    ...app,
    revenueShare: totalRevenue ? round((app.revenue / totalRevenue) * 100) : 0,
  }))
  const visibleRows = rowsWithShare.filter((app) => matchesPortfolioRow(app, filters))
  const summaryRowsWithShare = visibleRows.length ? visibleRows : rowsWithShare

  const scopeRatio = clamp(summaryRowsWithShare.length / portfolioApps.length, 0.4, 1)
  const volumeMultiplier = clamp(scopeRatio + (releaseMultiplier - 1) * 0.18, 0.38, 1.1)

  const averageRoi = average(summaryRowsWithShare.map((row) => row.roi))
  const averageActivationRate = weightedAverage(
    summaryRowsWithShare.map((row) => row.activationRate),
    summaryRowsWithShare.map((row) => row.installs),
  )
  const averageD1Retention = weightedAverage(
    summaryRowsWithShare.map((row) => row.d1Retention),
    summaryRowsWithShare.map((row) => row.installs),
  )
  const averageD7Retention = weightedAverage(
    summaryRowsWithShare.map((row) => row.d7Retention),
    summaryRowsWithShare.map((row) => row.installs),
  )
  const averageD30Retention = weightedAverage(
    summaryRowsWithShare.map((row) => row.d30Retention),
    summaryRowsWithShare.map((row) => row.installs),
  )
  const averagePayerConversion = weightedAverage(
    summaryRowsWithShare.map((row) => row.payerConversion),
    summaryRowsWithShare.map((row) => row.revenue),
  )
  const averageReleaseImpact = average(summaryRowsWithShare.map((row) => row.releaseImpact))
  const averageIssueSlaHours = average(summaryRowsWithShare.map((row) => row.issueSlaHours))
  const funnelFriction = round(
    weightedAverage(
      summaryRowsWithShare.map((row) => frictionWeights[row.dropOff]),
      summaryRowsWithShare.map((row) => row.installs),
    ),
  )

  const waitingForReview = summaryRowsWithShare.filter((row) => row.status === 'Waiting for Review').length
  const liveOrScaling = summaryRowsWithShare.filter(
    (row) => row.status === 'Live' || row.status === 'Scaling',
  ).length
  const pausedApps = summaryRowsWithShare.filter((row) => row.status === 'Paused').length
  const healthyApps = summaryRowsWithShare.filter(
    (row) => row.roi >= 3.5 && row.d30Retention >= 28,
  ).length
  const appsInReview = summaryRowsWithShare.filter(
    (row) => row.reviewStage === 'waiting_review' || row.reviewStage === 'hotfix_review',
  ).length
  const delayedApps = summaryRowsWithShare.filter((row) => row.delayFlag !== 'none').length
  const blockedApps = summaryRowsWithShare.filter((row) => row.blocker !== 'none').length
  const reviewBeyondSla = summaryRowsWithShare.filter((row) => row.queueDays >= 3).length

  const healthScore = clamp(
    Math.round(
      54 +
        averageRoi * 7 +
        averageD30Retention * 0.55 -
        pausedApps * 6 -
        waitingForReview * 2 -
        reviewBeyondSla * 2,
    ),
    45,
    94,
  )

  const issueSlaRate = clamp(
    Math.round(94 - reviewBeyondSla * 6 - delayedApps * 4 - pausedApps * 2 + (releaseMultiplier - 1) * 10),
    68,
    97,
  )

  const revenueSorted = sortByDescending(summaryRowsWithShare, (row) => row.revenue)
  const topRevenueApp = revenueSorted[0] ?? summaryRowsWithShare[0]
  const topTwoRevenue = (revenueSorted[0]?.revenue ?? 0) + (revenueSorted[1]?.revenue ?? 0)
  const topTwoShare = totalRevenue ? Math.round((topTwoRevenue / totalRevenue) * 100) : 0
  const topRoiApp = sortByDescending(summaryRowsWithShare, (row) => row.roi)[0] ?? summaryRowsWithShare[0]
  const hotspotRanking = sortByDescending(summaryRowsWithShare, getProductPriorityScore)
  const hotspotApp = hotspotRanking[0] ?? summaryRowsWithShare[0]
  const secondHotspotApp = hotspotRanking[1] ?? hotspotRanking[0] ?? summaryRowsWithShare[0]
  const blockedApp = sortByDescending(summaryRowsWithShare, getOpsPriorityScore)[0] ?? summaryRowsWithShare[0]

  const appLabel = copy.options.app[filters.app] ?? filters.app
  const channelLabel = copy.options.channel[filters.channel] ?? filters.channel
  const regionLabel = copy.options.region[filters.region] ?? filters.region
  const dateRangeLabel = copy.options.dateRange[filters.dateRange] ?? filters.dateRange
  const scopeLabel = filters.app === 'all' ? copy.options.app.all : appLabel

  const channelPerformance = channelPerformanceBase
    .filter((item) => filters.channel === 'all' || item.channel === filters.channel)
    .map((item) => {
      const roi = round(item.roi * roiMultiplier)
      const activationRate = round(item.activationRate * retentionMultiplier)
      const executionHealth = round(
        clamp(item.executionHealth * (0.96 + roiMultiplier * 0.04) - (activationRate < 18 ? 4 : 0), 58, 94),
        0,
      )
      const channelPill: ChannelPillKey =
        executionHealth >= 84 ? 'strong' : executionHealth >= 74 ? 'mixed' : 'weak'

      return {
        key: item.channel,
        label: copy.options.channel[item.channel] ?? item.channel,
        roi,
        activationRate,
        ctr: round(item.ctr * clamp(channelFactor.revenue * regionFactor.revenue, 0.82, 1.18), 1),
        executionHealth,
        channelPill,
      }
    })

  const revenueTrend = buildChartSeries(
    monthlyRevenueBase,
    dateRange.monthCount,
    copy.options.month,
    (point) => ({
      label: point.month,
      primary: Math.round(point.primary * revenueMultiplier),
      secondary: Math.round(point.secondary * revenueMultiplier * 0.97),
    }),
  )

  const releaseTrend = buildChartSeries(
    releaseLiftBase,
    dateRange.monthCount,
    copy.options.month,
    (point) => ({
      label: point.month,
      primary: round(point.primary * releaseMultiplier),
      secondary: round(point.secondary * clamp(0.98 + retentionMultiplier * 0.02, 0.96, 1.08)),
    }),
  )

  const opsLaunchTrend = buildChartSeries(
    opsLaunchBase,
    dateRange.monthCount,
    copy.options.month,
    (point) => ({
      label: point.month,
      primary: Math.max(1, Math.round(point.primary * volumeMultiplier)),
      secondary: Math.max(1, Math.round(point.secondary * clamp(scopeRatio + 0.18, 0.45, 1.12))),
    }),
  )

  const executiveLineTrend = buildLineSeries(
    executiveLineBase,
    dateRange.monthCount,
    copy.options.month,
    (point) => ({
      label: point.month,
      first: round(point.first * retentionMultiplier),
      second: round(point.second * retentionMultiplier),
    }),
  )

  const pmLineTrend = buildLineSeries(pmLineBase, dateRange.monthCount, copy.options.month, (point) => ({
    label: point.month,
    first: round(point.first * retentionMultiplier),
    second: round(point.second * retentionMultiplier),
  }))

  const opsQueueTrend = buildLineSeries(
    opsQueueBase,
    dateRange.monthCount,
    copy.options.month,
    (point) => ({
      label: point.month,
      first: Math.max(0, Math.round(point.first * clamp(scopeRatio + 0.2, 0.5, 1.1))),
      second: Math.max(0, Math.round(point.second * clamp(scopeRatio + 0.18, 0.5, 1.08))),
    }),
  )

  const launchesShipped = opsLaunchTrend.reduce((total, point) => total + point.primary, 0)
  const launchTarget = opsLaunchTrend.reduce((total, point) => total + point.secondary, 0)

  const bestChannel = sortByDescending(channelPerformance, (item) => item.roi)[0] ?? channelPerformance[0]
  const weakestActivationChannel =
    [...channelPerformance].sort((left, right) => left.activationRate - right.activationRate)[0] ??
    channelPerformance[0]
  const weakestExecutionChannel =
    [...channelPerformance].sort((left, right) => left.executionHealth - right.executionHealth)[0] ??
    channelPerformance[0]

  const scopeBadges = [
    copy.roles.executive.templates.scopeFocus(scopeLabel),
    dateRangeLabel,
    filters.channel === 'all' ? copy.options.channel.all : channelLabel,
    filters.region === 'all' ? copy.options.region.all : regionLabel,
  ]

  return {
    language,
    filters,
    copy,
    scopeLabel,
    channelLabel,
    regionLabel,
    dateRangeLabel,
    scopeBadges,
    matchingRows: visibleRows,
    summaryRows: summaryRowsWithShare,
    channelPerformance,
    revenueTrend,
    releaseTrend,
    opsLaunchTrend,
    executiveLineTrend,
    pmLineTrend,
    opsQueueTrend,
    totalRevenue,
    averageRoi,
    averageActivationRate,
    averageD1Retention,
    averageD7Retention,
    averageD30Retention,
    averagePayerConversion,
    averageReleaseImpact,
    averageIssueSlaHours,
    healthScore,
    funnelFriction,
    topTwoShare,
    waitingForReview,
    liveOrScaling,
    pausedApps,
    healthyApps,
    appsInReview,
    delayedApps,
    blockedApps,
    reviewBeyondSla,
    launchesShipped,
    launchTarget,
    issueSlaRate,
    topRevenueApp,
    topRoiApp,
    hotspotApp,
    secondHotspotApp,
    blockedApp,
    bestChannel,
    weakestActivationChannel,
    weakestExecutionChannel,
  }
}

function buildExecutiveTable(context: DashboardContext): DashboardSnapshot['portfolioTable'] {
  const { copy, matchingRows, summaryRows, scopeLabel, dateRangeLabel, language } = context
  const rows = (matchingRows.length ? matchingRows : summaryRows).map((row) => ({
    id: row.id,
    cells: {
      app: createAppCell(
        row.name,
        copy.categories[row.id as keyof typeof copy.categories] ?? row.category,
      ),
      status: createBadgeCell(copy.statusLabels[row.status] ?? row.status, getStatusTone(row.status), row.status),
      revenue: createMetricCell(
        compactCurrencyFormatter.format(row.revenue),
        language === 'zh' ? '所选范围收入' : 'selected revenue',
      ),
      roi: createMetricCell(
        formatRoi(row.roi),
        language === 'zh' ? '综合回收' : 'blended return',
        getMetricTone(row.roi, 4, 2.5),
      ),
      revenueShare: createMetricCell(
        formatPercent(row.revenueShare, 0),
        language === 'zh' ? '收入占比' : 'revenue share',
        row.revenueShare >= 32 ? 'warning' : 'default',
      ),
      lastRelease: createTextCell(formatDate(row.lastReleaseAt, language), undefined, 'muted'),
      risk: createBadgeCell(copy.riskFlags[row.riskFlag] ?? row.riskFlag, getRiskTone(row.riskSeverity)),
    },
  }))

  return {
    columns: [
      { key: 'app', label: copy.tableHeaders.app },
      { key: 'status', label: copy.tableHeaders.status },
      { key: 'revenue', label: copy.tableHeaders.revenue, align: 'right' },
      { key: 'roi', label: copy.tableHeaders.roi, align: 'right' },
      { key: 'revenueShare', label: copy.tableHeaders.revenueShare, align: 'right' },
      { key: 'lastRelease', label: copy.tableHeaders.lastRelease },
      { key: 'risk', label: copy.tableHeaders.risk },
    ],
    rows,
    headline: copy.roles.executive.templates.tableHeadline(rows.length, scopeLabel, dateRangeLabel),
    emptyMessage: copy.roles.executive.templates.emptyTableMessage,
  }
}

function buildPmTable(context: DashboardContext): DashboardSnapshot['portfolioTable'] {
  const { copy, matchingRows, summaryRows, scopeLabel, dateRangeLabel, language } = context
  const rows = (matchingRows.length ? matchingRows : summaryRows).map((row) => ({
    id: row.id,
    cells: {
      app: createAppCell(
        row.name,
        copy.categories[row.id as keyof typeof copy.categories] ?? row.category,
      ),
      status: createBadgeCell(copy.statusLabels[row.status] ?? row.status, getStatusTone(row.status), row.status),
      lastRelease: createTextCell(formatDate(row.lastReleaseAt, language), undefined, 'muted'),
      activation: createMetricCell(
        formatPercent(row.activationRate),
        `CTR ${formatPercent(row.ctr)}`,
        getMetricTone(row.activationRate, 24, 17),
      ),
      d1: createMetricCell(formatPercent(row.d1Retention), undefined, getMetricTone(row.d1Retention, 42, 34)),
      d7: createMetricCell(formatPercent(row.d7Retention), undefined, getMetricTone(row.d7Retention, 25, 19)),
      dropOff: createTextCell(copy.meta.dropOff[row.dropOff] ?? row.dropOff),
      issueFlag: createBadgeCell(
        copy.meta.issueFlags[row.issueFlag] ?? row.issueFlag,
        row.issueFlag === 'healthy_signal'
          ? 'emerald'
          : row.issueFlag === 'review_queue_pressure'
            ? 'amber'
            : 'rose',
      ),
      suggestedAction: createTextCell(
        copy.meta.suggestedActions[row.suggestedAction] ?? row.suggestedAction,
      ),
    },
  }))

  return {
    columns: [
      { key: 'app', label: copy.tableHeaders.app },
      { key: 'status', label: copy.tableHeaders.status },
      { key: 'lastRelease', label: copy.tableHeaders.lastRelease },
      { key: 'activation', label: copy.tableHeaders.activation, align: 'right' },
      { key: 'd1', label: copy.tableHeaders.d1, align: 'right' },
      { key: 'd7', label: copy.tableHeaders.d7, align: 'right' },
      { key: 'dropOff', label: copy.tableHeaders.dropOff },
      { key: 'issueFlag', label: copy.tableHeaders.issueFlag },
      { key: 'suggestedAction', label: copy.tableHeaders.suggestedAction },
    ],
    rows,
    headline: copy.roles.pm.templates.tableHeadline(rows.length, scopeLabel, dateRangeLabel),
    emptyMessage: copy.roles.pm.templates.emptyTableMessage,
  }
}

function buildOpsTable(context: DashboardContext): DashboardSnapshot['portfolioTable'] {
  const { copy, matchingRows, summaryRows, scopeLabel, dateRangeLabel, language } = context
  const rows = (matchingRows.length ? matchingRows : summaryRows).map((row) => ({
    id: row.id,
    cells: {
      app: createAppCell(
        row.name,
        copy.categories[row.id as keyof typeof copy.categories] ?? row.category,
      ),
      status: createBadgeCell(copy.statusLabels[row.status] ?? row.status, getStatusTone(row.status), row.status),
      reviewStage: createTextCell(copy.meta.reviewStage[row.reviewStage] ?? row.reviewStage),
      queueState: createTextCell(
        copy.meta.queueState[row.queueState] ?? row.queueState,
        row.queueDays > 0 ? (language === 'zh' ? `${row.queueDays} 天` : `${row.queueDays}d`) : undefined,
      ),
      channelStatus: createBadgeCell(
        copy.meta.channelStatus[row.channelStatus] ?? row.channelStatus,
        getExecutionTone(row.channelPill === 'strong' ? 88 : row.channelPill === 'mixed' ? 78 : 66),
      ),
      delayFlag: createBadgeCell(
        copy.meta.delayFlags[row.delayFlag] ?? row.delayFlag,
        row.delayFlag === 'none' ? 'emerald' : row.delayFlag === 'review_risk' ? 'amber' : 'rose',
      ),
      blocker: createTextCell(copy.meta.blockers[row.blocker] ?? row.blocker),
      nextAction: createTextCell(copy.meta.nextActions[row.nextAction] ?? row.nextAction),
    },
  }))

  return {
    columns: [
      { key: 'app', label: copy.tableHeaders.app },
      { key: 'status', label: copy.tableHeaders.status },
      { key: 'reviewStage', label: copy.tableHeaders.reviewStage },
      { key: 'queueState', label: copy.tableHeaders.queueState },
      { key: 'channelStatus', label: copy.tableHeaders.channelStatus },
      { key: 'delayFlag', label: copy.tableHeaders.delayFlag },
      { key: 'blocker', label: copy.tableHeaders.blocker },
      { key: 'nextAction', label: copy.tableHeaders.nextAction },
    ],
    rows,
    headline: copy.roles.ops.templates.tableHeadline(rows.length, scopeLabel, dateRangeLabel),
    emptyMessage: copy.roles.ops.templates.emptyTableMessage,
  }
}

function buildExecutiveSnapshot(context: DashboardContext): DashboardSnapshot {
  const roleCopy = context.copy.roles.executive
  const alerts = getRoleAlerts('executive', context.filters, context.copy)
  const revenueActual = context.revenueTrend.reduce((total, point) => total + point.primary, 0)
  const revenuePlan = context.revenueTrend.reduce((total, point) => total + point.secondary, 0)
  const revenueGap = revenueActual - revenuePlan
  const revenueDelta = round(7.6 + dateRangeSettings[context.filters.dateRange].growthShift + (context.totalRevenue / 6_000_000 - 1) * 5, 1)
  const roiDelta = round((context.averageRoi - 3.8) * 1.1, 1)
  const concentrationDelta = round(context.topTwoShare - 62, 0)
  const backlogDelta = context.waitingForReview - 1

  return {
    scopeBadges: [
      roleCopy.templates.scopeFocus(context.scopeLabel),
      context.dateRangeLabel,
      context.filters.channel === 'all' ? context.copy.options.channel.all : context.channelLabel,
      context.filters.region === 'all' ? context.copy.options.region.all : context.regionLabel,
    ],
    heroPanels: {
      primary: {
        label: roleCopy.hero.primaryLabel,
        value: `${context.healthScore}/100`,
        detail: roleCopy.templates.heroPrimaryDetail(context.healthyApps, context.healthScore),
      },
      secondary: {
        label: roleCopy.hero.secondaryLabel,
        value: context.topRoiApp.name,
        chip: roleCopy.templates.heroSecondaryChip(context.bestChannel.label),
        detail: roleCopy.templates.heroSecondaryDetail(
          context.topRoiApp.name,
          formatRoi(context.topRoiApp.roi),
        ),
      },
    },
    executiveSummary: [
      {
        title: roleCopy.summaryTitles.one,
        headline: roleCopy.templates.summaryOneHeadline(
          context.healthyApps,
          formatPercent(context.averageD30Retention),
        ),
        detail: roleCopy.templates.summaryOneDetail(context.liveOrScaling, context.waitingForReview),
      },
      {
        title: roleCopy.summaryTitles.two,
        headline: alerts[0].action,
        detail: roleCopy.templates.summaryTwoDetail(alerts[1]?.action ?? alerts[0].action),
      },
      {
        title: roleCopy.summaryTitles.three,
        headline: roleCopy.templates.summaryThreeHeadline(
          context.topRoiApp.name,
          formatRoi(context.topRoiApp.roi),
        ),
        detail: roleCopy.templates.summaryThreeDetail(context.bestChannel.label),
      },
      {
        title: roleCopy.summaryTitles.four,
        headline: roleCopy.templates.summaryFourHeadline(context.topTwoShare),
        detail: roleCopy.templates.summaryFourDetail(context.pausedApps, context.waitingForReview),
      },
    ],
    metricCards: [
      {
        title: roleCopy.kpis.revenue,
        value: compactCurrencyFormatter.format(revenueActual),
        deltaLabel: formatSignedPercent(revenueDelta),
        trend: revenueDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? `${context.scopeLabel} 在 ${context.dateRangeLabel} 内的净收入表现。`
            : `Net revenue for ${context.scopeLabel} across ${context.dateRangeLabel}.`,
        tone: 'sky',
        iconKey: 'revenue',
      },
      {
        title: roleCopy.kpis.roi,
        value: formatRoi(context.averageRoi),
        deltaLabel: `${roiDelta >= 0 ? '+' : ''}${roiDelta.toFixed(1)}x`,
        trend: roiDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? `${context.bestChannel.label} 仍是最稳的回收渠道。`
            : `${context.bestChannel.label} is still the cleanest payback lane.`,
        tone: 'emerald',
        iconKey: 'efficiency',
      },
      {
        title: roleCopy.kpis.concentration,
        value: formatPercent(context.topTwoShare, 0),
        deltaLabel: formatSignedPoints(concentrationDelta, context.language, 0),
        trend: concentrationDelta <= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '看收入是否过度依赖头部应用。'
            : 'Tracks whether the portfolio is leaning too hard on the top earners.',
        tone: 'amber',
        iconKey: 'risk',
      },
      {
        title: roleCopy.kpis.backlog,
        value: labelForCount(context.language, context.waitingForReview, 'app', 'apps'),
        deltaLabel: formatSignedCount(backlogDelta, context.language),
        trend: backlogDelta <= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '等待审核的应用越多，下一波增长越慢。'
            : 'Release queue pressure is the main drag on the next scaling wave.',
        tone: 'rose',
        iconKey: 'backlog',
      },
    ],
    areaChart: {
      headline: roleCopy.templates.areaHeadline(
        compactCurrencyFormatter.format(Math.abs(revenueGap)),
        revenueGap >= 0,
      ),
      format: 'currency',
      data: context.revenueTrend,
    },
    alerts,
    barChart: {
      format: 'roi',
      data: sortByDescending(context.channelPerformance, (item) => item.roi).map((item) => ({
        label: item.label,
        metric: item.roi,
        chip: roleCopy.templates.barTileChip(Math.round(180 / item.roi)),
        valueLabel: formatRoi(item.roi),
      })),
    },
    lineChart: {
      badge: roleCopy.templates.lineBadge(formatPercent(context.averagePayerConversion)),
      format: 'percent',
      data: context.executiveLineTrend,
      stats: [
        {
          label: roleCopy.stats.first,
          value: formatPercent(context.averageD30Retention),
          detail: roleCopy.statDetails.first,
        },
        {
          label: roleCopy.stats.second,
          value: formatPercent(context.averagePayerConversion),
          detail: roleCopy.statDetails.second,
        },
      ],
    },
    portfolioTable: buildExecutiveTable(context),
  }
}

function buildPmSnapshot(context: DashboardContext): DashboardSnapshot {
  const roleCopy = context.copy.roles.pm
  const alerts = getRoleAlerts('pm', context.filters, context.copy)
  const releaseObserved = context.releaseTrend.reduce((total, point) => total + point.primary, 0)
  const releaseExpected = context.releaseTrend.reduce((total, point) => total + point.secondary, 0)
  const releaseGap = round(releaseObserved / context.releaseTrend.length - releaseExpected / context.releaseTrend.length, 1)
  const releaseDelta = round(context.averageReleaseImpact - 11.6, 1)
  const activationDelta = round(context.averageActivationRate - 21.5, 1)
  const d1Delta = round(context.averageD1Retention - 40.2, 1)
  const frictionDelta = round(30 - context.funnelFriction, 1)
  const hotspotAction =
    context.copy.meta.suggestedActions[context.hotspotApp.suggestedAction] ?? context.hotspotApp.suggestedAction
  const secondAction =
    context.copy.meta.suggestedActions[context.secondHotspotApp.suggestedAction] ??
    context.secondHotspotApp.suggestedAction
  const hotspotDropOff =
    context.copy.meta.dropOff[context.hotspotApp.dropOff] ?? context.hotspotApp.dropOff

  return {
    scopeBadges: [
      roleCopy.templates.scopeFocus(context.scopeLabel),
      context.dateRangeLabel,
      context.filters.channel === 'all' ? context.copy.options.channel.all : context.channelLabel,
      context.filters.region === 'all' ? context.copy.options.region.all : context.regionLabel,
    ],
    heroPanels: {
      primary: {
        label: roleCopy.hero.primaryLabel,
        value: formatPercent(context.averageReleaseImpact),
        detail: roleCopy.templates.heroPrimaryDetail(
          formatPercent(context.averageReleaseImpact),
          getSlaLabel(context.language, context.issueSlaRate),
        ),
      },
      secondary: {
        label: roleCopy.hero.secondaryLabel,
        value: hotspotDropOff,
        chip: roleCopy.templates.heroSecondaryChip(context.hotspotApp.name),
        detail: roleCopy.templates.heroSecondaryDetail(hotspotDropOff, hotspotAction),
      },
    },
    executiveSummary: [
      {
        title: roleCopy.summaryTitles.one,
        headline: roleCopy.templates.summaryOneHeadline(
          formatPercent(context.averageReleaseImpact),
          formatPercent(context.averageD1Retention),
        ),
        detail: roleCopy.templates.summaryOneDetail(
          context.hotspotApp.name,
          formatPercent(context.hotspotApp.d7Retention),
        ),
      },
      {
        title: roleCopy.summaryTitles.two,
        headline: hotspotAction,
        detail: roleCopy.templates.summaryTwoDetail(secondAction),
      },
      {
        title: roleCopy.summaryTitles.three,
        headline: roleCopy.templates.summaryThreeHeadline(
          context.weakestActivationChannel.label,
          formatPercent(context.weakestActivationChannel.activationRate),
        ),
        detail: roleCopy.templates.summaryThreeDetail(secondAction),
      },
      {
        title: roleCopy.summaryTitles.four,
        headline: roleCopy.templates.summaryFourHeadline(
          context.hotspotApp.name,
          hotspotDropOff,
        ),
        detail: roleCopy.templates.summaryFourDetail(
          context.copy.meta.issueFlags[context.hotspotApp.issueFlag] ?? context.hotspotApp.issueFlag,
        ),
      },
    ],
    metricCards: [
      {
        title: roleCopy.kpis.releaseLift,
        value: formatPercent(context.averageReleaseImpact),
        deltaLabel: formatSignedPercent(releaseDelta),
        trend: releaseDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '看版本带来的真实增长是否超过预期。'
            : 'Measures whether recent launches are delivering lift beyond expected.',
        tone: 'rose',
        iconKey: 'release',
      },
      {
        title: roleCopy.kpis.activation,
        value: formatPercent(context.averageActivationRate),
        deltaLabel: formatSignedPoints(activationDelta, context.language),
        trend: activationDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? `${context.weakestActivationChannel.label} 仍是激活短板。`
            : `${context.weakestActivationChannel.label} is still the weakest activation lane.`,
        tone: 'sky',
        iconKey: 'activation',
      },
      {
        title: roleCopy.kpis.d1,
        value: formatPercent(context.averageD1Retention),
        deltaLabel: formatSignedPoints(d1Delta, context.language),
        trend: d1Delta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '首日留存是本周版本质量的主信号。'
            : 'Day-one retention is the clearest read on current release quality.',
        tone: 'amber',
        iconKey: 'retention',
      },
      {
        title: roleCopy.kpis.friction,
        value: formatPercent(context.funnelFriction),
        deltaLabel: formatSignedPoints(frictionDelta, context.language),
        trend: frictionDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '越低越好，表示引导链路更顺。'
            : 'Lower is better. This tracks where onboarding friction is still concentrated.',
        tone: 'emerald',
        iconKey: 'risk',
      },
    ],
    areaChart: {
      headline: roleCopy.templates.areaHeadline(formatPercent(Math.abs(releaseGap)), releaseGap >= 0),
      format: 'percent',
      data: context.releaseTrend,
    },
    alerts,
    barChart: {
      format: 'percent',
      data: [...context.channelPerformance]
        .sort((left, right) => right.activationRate - left.activationRate)
        .map((item) => ({
          label: item.label,
          metric: item.activationRate,
          chip: roleCopy.templates.barTileChip(formatPercent(item.ctr)),
          valueLabel: formatPercent(item.activationRate),
        })),
    },
    lineChart: {
      badge: roleCopy.templates.lineBadge(formatPercent(context.averageD7Retention)),
      format: 'percent',
      data: context.pmLineTrend,
      stats: [
        {
          label: roleCopy.stats.first,
          value: formatPercent(context.averageD1Retention),
          detail: roleCopy.statDetails.first,
        },
        {
          label: roleCopy.stats.second,
          value: formatPercent(context.averageD7Retention),
          detail: roleCopy.statDetails.second,
        },
      ],
    },
    portfolioTable: buildPmTable(context),
  }
}

function buildOpsSnapshot(context: DashboardContext): DashboardSnapshot {
  const roleCopy = context.copy.roles.ops
  const alerts = getRoleAlerts('ops', context.filters, context.copy)
  const shippedGap = context.launchesShipped - context.launchTarget
  const launchesDelta = context.launchTarget ? round((shippedGap / context.launchTarget) * 100, 1) : 0
  const backlogDelta = context.appsInReview - 2
  const blockedDelta = context.blockedApps - 2
  const slaDelta = round(context.issueSlaRate - 86, 1)

  return {
    scopeBadges: [
      roleCopy.templates.scopeFocus(context.scopeLabel),
      context.dateRangeLabel,
      context.filters.channel === 'all' ? context.copy.options.channel.all : context.channelLabel,
      context.filters.region === 'all' ? context.copy.options.region.all : context.regionLabel,
    ],
    heroPanels: {
      primary: {
        label: roleCopy.hero.primaryLabel,
        value:
          context.language === 'zh'
            ? `${context.launchesShipped}/${context.launchTarget}`
            : `${context.launchesShipped}/${context.launchTarget}`,
        detail: roleCopy.templates.heroPrimaryDetail(`${context.launchesShipped}`, context.appsInReview),
      },
      secondary: {
        label: roleCopy.hero.secondaryLabel,
        value: labelForCount(context.language, context.blockedApps, 'app', 'apps'),
        chip: roleCopy.templates.heroSecondaryChip(context.blockedApps),
        detail: roleCopy.templates.heroSecondaryDetail(
          getSlaLabel(context.language, context.issueSlaRate),
          getOpsQueueLabel(context.language, context.appsInReview),
        ),
      },
    },
    executiveSummary: [
      {
        title: roleCopy.summaryTitles.one,
        headline: roleCopy.templates.summaryOneHeadline(
          `${context.launchesShipped}`,
          `${context.launchTarget}`,
        ),
        detail: roleCopy.templates.summaryOneDetail(context.appsInReview, context.delayedApps),
      },
      {
        title: roleCopy.summaryTitles.two,
        headline: alerts[0].action,
        detail: roleCopy.templates.summaryTwoDetail(alerts[1]?.action ?? alerts[0].action),
      },
      {
        title: roleCopy.summaryTitles.three,
        headline: roleCopy.templates.summaryThreeHeadline(
          context.blockedApp.name,
          context.copy.meta.blockers[context.blockedApp.blocker] ?? context.blockedApp.blocker,
        ),
        detail: roleCopy.templates.summaryThreeDetail(context.weakestExecutionChannel.label),
      },
      {
        title: roleCopy.summaryTitles.four,
        headline: roleCopy.templates.summaryFourHeadline(context.reviewBeyondSla),
        detail: roleCopy.templates.summaryFourDetail(
          getSlaLabel(context.language, context.issueSlaRate),
          context.delayedApps,
        ),
      },
    ],
    metricCards: [
      {
        title: roleCopy.kpis.launches,
        value: `${context.launchesShipped}`,
        deltaLabel: formatSignedPercent(launchesDelta),
        trend: launchesDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? `${context.dateRangeLabel} 内已发版本数。`
            : `Launches shipped across ${context.dateRangeLabel}.`,
        tone: 'sky',
        iconKey: 'operations',
      },
      {
        title: roleCopy.kpis.backlog,
        value: labelForCount(context.language, context.appsInReview, 'app', 'apps'),
        deltaLabel: formatSignedCount(backlogDelta, context.language),
        trend: backlogDelta <= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '审核队列越长，越容易拖慢发版节奏。'
            : 'Review queue depth is the clearest drag on launch cadence.',
        tone: 'amber',
        iconKey: 'backlog',
      },
      {
        title: roleCopy.kpis.blocked,
        value: labelForCount(context.language, context.blockedApps, 'app', 'apps'),
        deltaLabel: formatSignedCount(blockedDelta, context.language),
        trend: blockedDelta <= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? `${context.blockedApp.name} 当前最需要跨团队推进。`
            : `${context.blockedApp.name} is the biggest coordination blocker right now.`,
        tone: 'rose',
        iconKey: 'risk',
      },
      {
        title: roleCopy.kpis.sla,
        value: `${context.issueSlaRate}%`,
        deltaLabel: formatSignedPoints(slaDelta, context.language),
        trend: slaDelta >= 0 ? 'up' : 'down',
        blurb:
          context.language === 'zh'
            ? '问题闭环速度直接影响发版和放量效率。'
            : 'Issue response speed is holding the line on launch and scaling throughput.',
        tone: 'emerald',
        iconKey: 'efficiency',
      },
    ],
    areaChart: {
      headline: roleCopy.templates.areaHeadline(`${Math.abs(shippedGap)}`, shippedGap >= 0),
      format: 'count',
      data: context.opsLaunchTrend,
    },
    alerts,
    barChart: {
      format: 'percent',
      data: [...context.channelPerformance]
        .sort((left, right) => right.executionHealth - left.executionHealth)
        .map((item) => ({
          label: item.label,
          metric: item.executionHealth,
          chip: roleCopy.templates.barTileChip(context.copy.meta.channelPills[item.channelPill]),
          valueLabel: `${item.executionHealth}%`,
        })),
    },
    lineChart: {
      badge: roleCopy.templates.lineBadge(`${context.issueSlaRate}%`),
      format: 'count',
      data: context.opsQueueTrend,
      stats: [
        {
          label: roleCopy.stats.first,
          value: `${context.appsInReview}`,
          detail: roleCopy.statDetails.first,
        },
        {
          label: roleCopy.stats.second,
          value: `${context.blockedApps}`,
          detail: roleCopy.statDetails.second,
        },
      ],
    },
    portfolioTable: buildOpsTable(context),
  }
}

export function formatMillionsTick(value: number) {
  return `${(value / 1_000_000).toFixed(1)}M`
}

export function formatCountTick(value: number) {
  return compactNumberFormatter.format(value)
}

export function formatRoiTick(value: number) {
  return `${value.toFixed(1)}x`
}

export function formatTooltipCurrency(
  value: string | number | readonly (string | number)[] | undefined,
) {
  const normalizedValue = Array.isArray(value) ? value[0] : value

  return compactCurrencyFormatter.format(Number(normalizedValue ?? 0))
}

export function formatTooltipPercent(
  value: string | number | readonly (string | number)[] | undefined,
) {
  const normalizedValue = Array.isArray(value) ? value[0] : value

  return `${Number(normalizedValue ?? 0).toFixed(1)}%`
}

export function formatTooltipCount(
  value: string | number | readonly (string | number)[] | undefined,
) {
  const normalizedValue = Array.isArray(value) ? value[0] : value

  return compactNumberFormatter.format(Number(normalizedValue ?? 0))
}

export function getDashboardSnapshot(
  filters: FilterState,
  language: Language,
  role: Role,
): DashboardSnapshot {
  const context = createDashboardContext(filters, language)

  if (role === 'executive') {
    return buildExecutiveSnapshot(context)
  }

  if (role === 'pm') {
    return buildPmSnapshot(context)
  }

  return buildOpsSnapshot(context)
}
