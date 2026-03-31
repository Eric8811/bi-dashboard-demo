export const roleOptions = [
  { value: 'executive' },
  { value: 'pm' },
  { value: 'ops' },
] as const

export type Role = (typeof roleOptions)[number]['value']
export type Language = 'en' | 'zh'

const dashboardCopy = {
  en: {
    pageTitle: 'Portfolio Operating Dashboard',
    shell: {
      title: 'Northstar Portfolio BI',
      subtitle: 'Role-based operating dashboard',
    },
    toolbar: {
      role: 'View',
      language: 'Lang',
    },
    languages: {
      en: 'EN',
      zh: '中文',
    },
    roles: {
      executive: {
        label: 'Executive',
        hero: {
          badge: 'Executive portfolio view',
          title: 'See portfolio health, revenue quality, and capital allocation in one operating readout.',
          description:
            'A clean leadership view for deciding where to scale, where to hold, and where release backlog is starting to slow growth.',
          primaryLabel: 'Portfolio health',
          secondaryLabel: 'Capital allocation',
        },
        summaryTitles: {
          one: 'Portfolio health',
          two: 'Key actions',
          three: 'Growth bets',
          four: 'Top risks',
        },
        kpis: {
          revenue: 'Portfolio net revenue',
          roi: 'Blended ROI',
          concentration: 'Top-2 revenue share',
          backlog: 'Release backlog',
        },
        sections: {
          areaEyebrow: 'Revenue Quality',
          areaTitle: 'Net revenue versus plan',
          alertsEyebrow: 'Business Risks',
          alertsTitle: 'Signals that could change this quarter',
          actionLabel: 'Recommended move:',
          barEyebrow: 'Capital Efficiency',
          barTitle: 'ROI by growth channel',
          barSubtitle: 'Where spend and owned demand still earn the right to scale',
          lineEyebrow: 'Revenue Durability',
          lineTitle: 'Retention and payer quality',
          tableEyebrow: 'Portfolio Mix',
          tableTitle: 'Apps to scale, hold, or pause',
        },
        stats: {
          first: 'Weighted D30 retention',
          second: 'Payer conversion',
        },
        statDetails: {
          first: 'Retention still supports durable monetization in the selected mix.',
          second: 'Payer quality is holding even as the portfolio keeps scaling.',
        },
        series: {
          areaPrimary: 'Actual',
          areaSecondary: 'Plan',
          bar: 'ROI',
          lineFirst: 'D30 retention',
          lineSecond: 'Payer conversion',
        },
        templates: {
          scopeFocus: (scopeLabel: string) => `${scopeLabel} focus`,
          heroPrimaryDetail: (healthyApps: number, healthScore: number) =>
            `${healthyApps} apps are above hurdle rates; health score is ${healthScore}/100.`,
          heroSecondaryChip: (channelLabel: string) => `Best scaling lane: ${channelLabel}`,
          heroSecondaryDetail: (appName: string, roiLabel: string) =>
            `${appName} and owned channels are still clearing the capital bar at ${roiLabel}.`,
          summaryOneHeadline: (healthyApps: number, retentionLabel: string) =>
            `${healthyApps} apps are compounding with weighted D30 at ${retentionLabel}.`,
          summaryOneDetail: (liveCount: number, backlog: number) =>
            `${liveCount} apps are live or scaling, while ${backlog} still sit in release backlog.`,
          summaryTwoDetail: (secondAction: string) => `Next: ${secondAction}`,
          summaryThreeHeadline: (appName: string, roiLabel: string) =>
            `${appName} remains the cleanest growth bet at ${roiLabel}.`,
          summaryThreeDetail: (channelLabel: string) =>
            `${channelLabel} keeps the healthiest payback in the current mix.`,
          summaryFourHeadline: (topTwoShare: number) =>
            `Top two apps now contribute ${topTwoShare}% of selected revenue.`,
          summaryFourDetail: (pausedApps: number, backlog: number) => {
            const pausedText =
              pausedApps > 0
                ? `${pausedApps} paused app${pausedApps > 1 ? 's' : ''} still need cleanup.`
                : 'Paused inventory is contained.'
            const backlogText =
              backlog > 0 ? `${backlog} apps are still waiting on release throughput.` : 'Release backlog is under control.'

            return `${pausedText} ${backlogText}`
          },
          areaHeadline: (gapLabel: string, abovePlan: boolean) =>
            abovePlan ? `+${gapLabel} versus plan` : `-${gapLabel} versus plan`,
          barTileChip: (paybackDays: number) => `${paybackDays}d payback`,
          lineBadge: (payerLabel: string) => `${payerLabel} payer conversion`,
          tableHeadline: (count: number, scopeLabel: string, dateRangeLabel: string) =>
            `${count} apps in scope • ${scopeLabel} • ${dateRangeLabel}`,
          emptyTableMessage:
            'No apps match this exact filter set. Widen the scope to review portfolio mix.',
        },
      },
      pm: {
        label: 'AI PM',
        hero: {
          badge: 'AI product manager view',
          title: 'Track release impact, activation quality, and retention friction across the app portfolio.',
          description:
            'A product execution view that links recent releases to onboarding quality, D1 and D7 behavior, and the next fixes worth shipping.',
          primaryLabel: 'Release confidence',
          secondaryLabel: 'Product priority',
        },
        summaryTitles: {
          one: 'Release readout',
          two: 'Fix today',
          three: 'Experiment lane',
          four: 'Hotspot',
        },
        kpis: {
          releaseLift: 'Release lift',
          activation: 'Activation rate',
          d1: 'D1 retention',
          friction: 'Onboarding friction',
        },
        sections: {
          areaEyebrow: 'Release Impact',
          areaTitle: 'Observed lift versus expected lift',
          alertsEyebrow: 'Product Alerts',
          alertsTitle: 'Execution signals to triage now',
          actionLabel: 'Recommended fix:',
          barEyebrow: 'Activation Quality',
          barTitle: 'Activation by channel',
          barSubtitle: 'Where top-funnel volume is not converting into real onboarding progress',
          lineEyebrow: 'Retention Quality',
          lineTitle: 'D1 and D7 after recent releases',
          tableEyebrow: 'Product Readout',
          tableTitle: 'Release, funnel, and issue view by app',
        },
        stats: {
          first: 'Weighted D1 retention',
          second: 'Weighted D7 retention',
        },
        statDetails: {
          first: 'First-session quality remains the clearest leading signal after release.',
          second: 'D7 shows whether onboarding gains are surviving beyond the first visit.',
        },
        series: {
          areaPrimary: 'Observed lift',
          areaSecondary: 'Expected lift',
          bar: 'Activation',
          lineFirst: 'D1 retention',
          lineSecond: 'D7 retention',
        },
        templates: {
          scopeFocus: (scopeLabel: string) => `${scopeLabel} slice`,
          heroPrimaryDetail: (releaseLiftLabel: string, issueRateLabel: string) =>
            `Release lift is ${releaseLiftLabel}; issue response is holding at ${issueRateLabel}.`,
          heroSecondaryChip: (appName: string) => `Hot path: ${appName}`,
          heroSecondaryDetail: (dropOffLabel: string, actionLabel: string) =>
            `${dropOffLabel} is still the main friction point. ${actionLabel}`,
          summaryOneHeadline: (releaseLiftLabel: string, d1Label: string) =>
            `Recent releases are delivering ${releaseLiftLabel} lift with D1 at ${d1Label}.`,
          summaryOneDetail: (regressionApp: string, regressionLabel: string) =>
            `${regressionApp} is still the clearest release-to-retention regression at ${regressionLabel}.`,
          summaryTwoDetail: (secondAction: string) => `Then: ${secondAction}`,
          summaryThreeHeadline: (channelLabel: string, activationLabel: string) =>
            `${channelLabel} still has headroom if activation moves from ${activationLabel}.`,
          summaryThreeDetail: (experimentLabel: string) =>
            `${experimentLabel} is the most actionable experiment lane today.`,
          summaryFourHeadline: (appName: string, dropOffLabel: string) =>
            `${appName} is leaking hardest at ${dropOffLabel}.`,
          summaryFourDetail: (issueFlag: string) =>
            `${issueFlag} remains the issue pattern most likely to hit next week's retention.`,
          areaHeadline: (liftLabel: string, abovePlan: boolean) =>
            abovePlan ? `${liftLabel} above expected` : `${liftLabel} below expected`,
          barTileChip: (ctrLabel: string) => `${ctrLabel} CTR`,
          lineBadge: (retentionLabel: string) => `${retentionLabel} D7`,
          tableHeadline: (count: number, scopeLabel: string, dateRangeLabel: string) =>
            `${count} apps in scope • ${scopeLabel} • ${dateRangeLabel}`,
          emptyTableMessage:
            'No product rows match this filter combination. Widen the slice to compare release and funnel signals.',
        },
      },
      ops: {
        label: 'Ops Lead',
        hero: {
          badge: 'Operations lead view',
          title: 'Run launch throughput, review queue health, and daily coordination from one operating board.',
          description:
            'An operations view for staying ahead of review delays, blocker handoffs, stale channel execution, and the work needed to keep launches moving.',
          primaryLabel: 'Launch throughput',
          secondaryLabel: 'Coordination load',
        },
        summaryTitles: {
          one: 'Pipeline health',
          two: 'Today',
          three: 'Scale blockers',
          four: 'Ops risk',
        },
        kpis: {
          launches: 'Launches shipped',
          backlog: 'Apps in review',
          blocked: 'Blocked apps',
          sla: 'Issue SLA',
        },
        sections: {
          areaEyebrow: 'Launch Throughput',
          areaTitle: 'Shipped launches versus target',
          alertsEyebrow: 'Ops Alerts',
          alertsTitle: 'Shipping risks that need follow-up',
          actionLabel: 'Recommended step:',
          barEyebrow: 'Channel Execution',
          barTitle: 'Execution health by channel',
          barSubtitle: 'Where stale assets, weak handoffs, or soft activation are slowing scaling',
          lineEyebrow: 'Queue Health',
          lineTitle: 'Review queue and blocked handoffs',
          tableEyebrow: 'Ops Queue',
          tableTitle: 'Status, blockers, and next actions by app',
        },
        stats: {
          first: 'Apps in review',
          second: 'Blocked handoffs',
        },
        statDetails: {
          first: 'Queue load shows where review and metadata work are stacking up.',
          second: 'Blocked handoffs are the clearest signal that coordination is slipping.',
        },
        series: {
          areaPrimary: 'Shipped',
          areaSecondary: 'Target',
          bar: 'Execution health',
          lineFirst: 'Review queue',
          lineSecond: 'Blocked handoffs',
        },
        templates: {
          scopeFocus: (scopeLabel: string) => `${scopeLabel} queue`,
          heroPrimaryDetail: (launchesLabel: string, backlog: number) =>
            `${launchesLabel} shipped this cycle; ${backlog} apps still sit in review flow.`,
          heroSecondaryChip: (blockedApps: number) => `${blockedApps} blocked`,
          heroSecondaryDetail: (slaLabel: string, queueLabel: string) =>
            `Issue SLA is ${slaLabel}, with ${queueLabel} still creating drag this week.`,
          summaryOneHeadline: (launchesLabel: string, targetLabel: string) =>
            `${launchesLabel} launches shipped against a ${targetLabel} target.`,
          summaryOneDetail: (backlog: number, delayedApps: number) =>
            `${backlog} apps are in review queue and ${delayedApps} are carrying active delay risk.`,
          summaryTwoDetail: (secondAction: string) => `Then: ${secondAction}`,
          summaryThreeHeadline: (appName: string, blockerLabel: string) =>
            `${appName} is the biggest scaling blocker because ${blockerLabel}.`,
          summaryThreeDetail: (channelLabel: string) =>
            `${channelLabel} needs the next execution refresh to stop efficiency drift.`,
          summaryFourHeadline: (backlog: number) =>
            `${backlog} apps are beyond the target review cadence.`,
          summaryFourDetail: (slaLabel: string, delayedApps: number) =>
            `Issue response is ${slaLabel}; ${delayedApps} apps still risk slipping planned launch dates.`,
          areaHeadline: (deltaLabel: string, abovePlan: boolean) =>
            abovePlan ? `${deltaLabel} above ship target` : `${deltaLabel} below ship target`,
          barTileChip: (statusLabel: string) => statusLabel,
          lineBadge: (slaLabel: string) => `${slaLabel} within SLA`,
          tableHeadline: (count: number, scopeLabel: string, dateRangeLabel: string) =>
            `${count} apps in scope • ${scopeLabel} • ${dateRangeLabel}`,
          emptyTableMessage:
            'No operational rows match this filter set. Widen the scope to review queue and blocker status.',
        },
      },
    },
    filters: {
      dateRange: 'Date range',
      app: 'App',
      channel: 'Channel',
      region: 'Region',
    },
    options: {
      dateRange: {
        '30d': 'Last 30 days',
        qtd: 'Quarter to date',
        '6m': 'Last 6 months',
      },
      app: {
        all: 'All apps',
        'atlas-home': 'Atlas Home',
        pulsepath: 'PulsePath',
        'creator-studio': 'Creator Studio',
        'ledger-flow': 'Ledger Flow',
        'nurture-loop': 'Nurture Loop',
        'travel-scout': 'Travel Scout',
      },
      channel: {
        all: 'All channels',
        organic: 'Organic',
        'paid-social': 'Paid social',
        'search-ads': 'Apple Search Ads',
        'lifecycle-crm': 'Lifecycle CRM',
        'creator-partnerships': 'Creator partnerships',
      },
      region: {
        all: 'All regions',
        na: 'North America',
        emea: 'EMEA',
        apac: 'APAC',
        latam: 'LATAM',
      },
      month: {
        Jan: 'Jan',
        Feb: 'Feb',
        Mar: 'Mar',
        Apr: 'Apr',
        May: 'May',
        Jun: 'Jun',
      },
    },
    statusLabels: {
      'In Development': 'In Development',
      'Waiting for Review': 'Waiting for Review',
      Live: 'Live',
      Scaling: 'Scaling',
      Paused: 'Paused',
    },
    severityLabels: {
      high: 'High',
      medium: 'Medium',
      watch: 'Watch',
    },
    tableHeaders: {
      app: 'App',
      status: 'Status',
      revenue: 'Revenue',
      roi: 'ROI',
      revenueShare: 'Revenue share',
      lastRelease: 'Latest release',
      risk: 'Risk',
      activation: 'Activation',
      d1: 'D1',
      d7: 'D7',
      dropOff: 'Drop-off',
      issueFlag: 'Issue',
      suggestedAction: 'Next action',
      reviewStage: 'Review stage',
      queueState: 'Queue state',
      channelStatus: 'Channel status',
      delayFlag: 'Delay flag',
      blocker: 'Blocker',
      nextAction: 'Next step',
    },
    categories: {
      'atlas-home': 'Connected home subscription',
      pulsepath: 'Health coaching membership',
      'creator-studio': 'Workflow tools for creators',
      'ledger-flow': 'Finance and invoicing suite',
      'nurture-loop': 'CRM automation beta',
      'travel-scout': 'Trip planning marketplace',
    },
    riskFlags: {
      healthy: 'Healthy',
      concentration: 'Revenue concentration',
      retention: 'Retention slip',
      review: 'Review queue risk',
      monetization: 'Thin monetization',
      paused: 'Paused spend drag',
    },
    meta: {
      dropOff: {
        paywall_step3: 'Paywall step 3',
        onboarding_step2: 'Onboarding step 2',
        template_picker: 'Template picker',
        permissions_gate: 'Permissions gate',
        trial_copy: 'Trial copy step',
        search_blank_state: 'Search blank state',
      },
      issueFlags: {
        revenue_mix_skew: 'Revenue mix skew',
        release_retention_regression: 'Release retention regression',
        healthy_signal: 'Healthy signal',
        review_queue_pressure: 'Review queue pressure',
        activation_gap: 'Activation gap',
        paused_efficiency: 'Paused efficiency drag',
      },
      suggestedActions: {
        trim_paid_social_mix: 'Trim paid-social mix',
        rollback_onboarding_order: 'Rollback onboarding order',
        extend_partner_tests: 'Extend partner test set',
        clear_qa_signoff: 'Clear QA sign-off',
        tighten_trial_copy: 'Tighten trial copy',
        hold_spend_cleanup: 'Finish spend cleanup',
      },
      reviewStage: {
        live_monitoring: 'Live monitoring',
        hotfix_review: 'Hotfix in review',
        live_scaling: 'Live scaling',
        waiting_review: 'Waiting for review',
        qa_pass: 'QA passed',
        paused_queue: 'Paused queue',
      },
      queueState: {
        clear: 'No queue',
        review_48h: 'In review 48h',
        partner_ready: 'Ready to scale',
        metadata_hold: 'Metadata hold',
        cross_team_wait: 'Cross-team wait',
        paused: 'Paused',
      },
      channelStatus: {
        creative_aging: 'Creative aging',
        tiktok_uk_soft: 'TikTok UK soft',
        partner_fresh: 'Partner mix healthy',
        asa_stable: 'ASA stable',
        crm_soft: 'CRM soft',
        spend_paused: 'Spend paused',
      },
      delayFlags: {
        none: 'On track',
        hotfix_hold: 'Hotfix holding scale',
        review_risk: 'Review window risk',
        copy_delay: 'Copy handoff delay',
        paused_launch: 'Launch paused',
      },
      blockers: {
        creative_refresh: 'creative refresh is overdue',
        android_hotfix: 'the Android hotfix is still pending',
        none: 'no active blocker is holding scale',
        qa_signoff: 'final QA sign-off is still open',
        pricing_copy: 'pricing copy is not final',
        demand_pause: 'demand is paused pending cleanup',
      },
      nextActions: {
        approve_refresh: 'Approve refreshed creatives by Thu',
        ship_patch: 'Ship patch and retest D1',
        open_next_test: 'Open the next partner experiment',
        escalate_review: 'Escalate review packet today',
        lock_trial_copy: 'Lock trial copy before release',
        close_pause_items: 'Close pause checklist this week',
      },
      channelPills: {
        strong: 'Strong',
        mixed: 'Mixed',
        weak: 'At risk',
      },
    },
    alerts: {
      executive: {
        concentration: {
          title: 'Top 2 apps now contribute too much revenue share',
          detail: 'Portfolio growth is leaning too heavily on the current top earners, which raises release and mix risk.',
          action: 'Shift next-wave promotion toward the next best ROI app before concentration climbs further.',
        },
        backlog: {
          title: 'Review backlog is slowing next-wave growth',
          detail: 'Too many launches are still waiting on review, which delays the next set of monetization and scaling bets.',
          action: 'Prioritize release clearing for the next two apps with scaling-ready economics.',
        },
        pausedSpend: {
          title: 'One paused app is still consuming spend',
          detail: 'A paused app still has residual channel cost and is not earning its place in the current mix.',
          action: 'Finish pause cleanup and reallocate the remaining spend to owned or partner channels.',
        },
      },
      pm: {
        retentionDrop: {
          title: 'Retention dropped after onboarding order change',
          detail: 'The latest onboarding sequence improved installs but weakened early retention in paid cohorts.',
          action: 'Restore the stronger onboarding order for the affected cohort and recheck D1 and D7 tomorrow.',
        },
        activationGap: {
          title: 'High CTR but weak activation in TikTok UK',
          detail: 'Top-funnel click quality is not converting into meaningful onboarding progress.',
          action: 'Tighten store-page intent and cut low-quality creative variants before more budget lands.',
        },
        releaseTradeoff: {
          title: 'Latest release lifted installs but hurt D1 retention',
          detail: 'Store momentum improved after the release, but first-day product quality fell in the same window.',
          action: 'Ship the smaller onboarding patch first, then retest release messaging against D1 quality.',
        },
      },
      ops: {
        reviewSla: {
          title: '2 apps are stuck in review beyond target SLA',
          detail: 'Store review timing is now the biggest blocker to this week’s launch cadence.',
          action: 'Escalate the review packets and keep QA and metadata owners in the same handoff loop today.',
        },
        creativeRefresh: {
          title: 'One scaling app lacks creative refresh and is losing efficiency',
          detail: 'Execution quality is fading because fresh channel assets have not landed on schedule.',
          action: 'Pull creative approval forward and swap the stale set before the next spend wave.',
        },
        handoffDelay: {
          title: 'Cross-functional handoff delay is blocking a scheduled launch',
          detail: 'The app is nearly ready, but one open dependency is still holding its launch slot.',
          action: 'Resolve the open handoff owner today and lock the final launch checklist before EOD.',
        },
      },
    },
  },
  zh: {
    pageTitle: '组合运营看板',
    shell: {
      title: 'Northstar 组合 BI',
      subtitle: '角色化运营视图',
    },
    toolbar: {
      role: '视角',
      language: '语言',
    },
    languages: {
      en: 'EN',
      zh: '中文',
    },
    roles: {
      executive: {
        label: '管理层',
        hero: {
          badge: '管理层视角',
          title: '集中看组合健康、收入质量和投放取舍。',
          description: '适合管理层快速判断该继续放量、暂缓，还是优先清理发布积压。',
          primaryLabel: '组合健康',
          secondaryLabel: '资源投放',
        },
        summaryTitles: {
          one: '健康概览',
          two: '今日动作',
          three: '增长机会',
          four: '主要风险',
        },
        kpis: {
          revenue: '组合净收入',
          roi: '综合ROI',
          concentration: '前二收入占比',
          backlog: '发布积压',
        },
        sections: {
          areaEyebrow: '收入质量',
          areaTitle: '净收入对计划',
          alertsEyebrow: '业务风险',
          alertsTitle: '本季度需关注的信号',
          actionLabel: '建议动作：',
          barEyebrow: '投放效率',
          barTitle: '渠道 ROI',
          barSubtitle: '看哪些渠道还值得继续加码',
          lineEyebrow: '收入韧性',
          lineTitle: '留存与付费质量',
          tableEyebrow: '组合分布',
          tableTitle: '按产品看放量取舍',
        },
        stats: {
          first: '加权 D30',
          second: '付费转化',
        },
        statDetails: {
          first: '当前留存仍能支撑所选组合的中长期变现质量。',
          second: '付费质量在继续放量下仍保持稳定。',
        },
        series: {
          areaPrimary: '实际',
          areaSecondary: '计划',
          bar: 'ROI',
          lineFirst: 'D30',
          lineSecond: '付费转化',
        },
        templates: {
          scopeFocus: (scopeLabel: string) => `聚焦 ${scopeLabel}`,
          heroPrimaryDetail: (healthyApps: number, healthScore: number) =>
            `${healthyApps} 个应用达标，健康分 ${healthScore}/100。`,
          heroSecondaryChip: (channelLabel: string) => `优先渠道：${channelLabel}`,
          heroSecondaryDetail: (appName: string, roiLabel: string) =>
            `${appName} 仍是最稳的加码方向，ROI 为 ${roiLabel}。`,
          summaryOneHeadline: (healthyApps: number, retentionLabel: string) =>
            `${healthyApps} 个应用达标，加权 D30 为 ${retentionLabel}。`,
          summaryOneDetail: (liveCount: number, backlog: number) =>
            `${liveCount} 个应用在上线或放量，${backlog} 个仍在发布积压。`,
          summaryTwoDetail: (secondAction: string) => `其次：${secondAction}`,
          summaryThreeHeadline: (appName: string, roiLabel: string) =>
            `${appName} 仍是最优增长标的，ROI ${roiLabel}。`,
          summaryThreeDetail: (channelLabel: string) => `${channelLabel} 仍是最稳的增量渠道。`,
          summaryFourHeadline: (topTwoShare: number) => `前两大应用已占 ${topTwoShare}% 收入。`,
          summaryFourDetail: (pausedApps: number, backlog: number) => {
            const pausedText = pausedApps > 0 ? `仍有 ${pausedApps} 个暂停应用待清理。` : '暂停库存可控。'
            const backlogText = backlog > 0 ? `发布积压仍拖慢下一波增长。` : '发布积压基本受控。'

            return `${pausedText}${backlogText}`
          },
          areaHeadline: (gapLabel: string, abovePlan: boolean) =>
            abovePlan ? `较计划高 ${gapLabel}` : `较计划低 ${gapLabel}`,
          barTileChip: (paybackDays: number) => `${paybackDays}天回本`,
          lineBadge: (payerLabel: string) => `付费转化 ${payerLabel}`,
          tableHeadline: (count: number, scopeLabel: string, dateRangeLabel: string) =>
            `${count} 个应用 • ${scopeLabel} • ${dateRangeLabel}`,
          emptyTableMessage: '当前筛选下没有匹配应用，建议放宽范围查看整体组合。',
        },
      },
      pm: {
        label: 'AI产品',
        hero: {
          badge: 'AI 产品视角',
          title: '看版本效果、激活质量和留存摩擦。',
          description: '适合产品负责人定位上线后的漏斗问题、留存回落和下一步实验机会。',
          primaryLabel: '版本信心',
          secondaryLabel: '产品优先级',
        },
        summaryTitles: {
          one: '版本回看',
          two: '先修什么',
          three: '实验机会',
          four: '热点问题',
        },
        kpis: {
          releaseLift: '版本提升',
          activation: '激活率',
          d1: 'D1留存',
          friction: '引导摩擦',
        },
        sections: {
          areaEyebrow: '版本影响',
          areaTitle: '实际提升对预期',
          alertsEyebrow: '产品预警',
          alertsTitle: '当前要处理的信号',
          actionLabel: '建议修复：',
          barEyebrow: '激活质量',
          barTitle: '渠道激活率',
          barSubtitle: '看哪里只有流量，没有真正进入产品',
          lineEyebrow: '留存质量',
          lineTitle: '版本后的 D1 / D7',
          tableEyebrow: '产品视图',
          tableTitle: '按应用看版本、漏斗和问题',
        },
        stats: {
          first: '加权 D1',
          second: '加权 D7',
        },
        statDetails: {
          first: '首会话质量仍是版本后最早能看到的产品信号。',
          second: 'D7 更能说明引导改动能不能真正留下用户。',
        },
        series: {
          areaPrimary: '实际提升',
          areaSecondary: '预期提升',
          bar: '激活率',
          lineFirst: 'D1',
          lineSecond: 'D7',
        },
        templates: {
          scopeFocus: (scopeLabel: string) => `${scopeLabel} 视图`,
          heroPrimaryDetail: (releaseLiftLabel: string, issueRateLabel: string) =>
            `版本提升 ${releaseLiftLabel}，问题响应 ${issueRateLabel}。`,
          heroSecondaryChip: (appName: string) => `热点：${appName}`,
          heroSecondaryDetail: (dropOffLabel: string, actionLabel: string) =>
            `当前最大流失点在 ${dropOffLabel}。${actionLabel}`,
          summaryOneHeadline: (releaseLiftLabel: string, d1Label: string) =>
            `最近版本带来 ${releaseLiftLabel} 提升，D1 为 ${d1Label}。`,
          summaryOneDetail: (regressionApp: string, regressionLabel: string) =>
            `${regressionApp} 当前是最明显的版本留存回归，D7 为 ${regressionLabel}。`,
          summaryTwoDetail: (secondAction: string) => `随后：${secondAction}`,
          summaryThreeHeadline: (channelLabel: string, activationLabel: string) =>
            `${channelLabel} 还有空间，前提是激活从 ${activationLabel} 继续提升。`,
          summaryThreeDetail: (experimentLabel: string) => `${experimentLabel} 是今天最值得做的实验线。`,
          summaryFourHeadline: (appName: string, dropOffLabel: string) =>
            `${appName} 当前主要卡在 ${dropOffLabel}。`,
          summaryFourDetail: (issueFlag: string) => `${issueFlag} 仍最可能压到下周留存。`,
          areaHeadline: (liftLabel: string, abovePlan: boolean) =>
            abovePlan ? `较预期高 ${liftLabel}` : `较预期低 ${liftLabel}`,
          barTileChip: (ctrLabel: string) => `CTR ${ctrLabel}`,
          lineBadge: (retentionLabel: string) => `D7 ${retentionLabel}`,
          tableHeadline: (count: number, scopeLabel: string, dateRangeLabel: string) =>
            `${count} 个应用 • ${scopeLabel} • ${dateRangeLabel}`,
          emptyTableMessage: '当前筛选下没有匹配的产品视图数据，建议放宽条件再看。',
        },
      },
      ops: {
        label: '运营',
        hero: {
          badge: '运营视角',
          title: '盯发布吞吐、审核队列和协同堵点。',
          description: '适合运营负责人安排今天要推进的审核、交付、素材和跨团队协同动作。',
          primaryLabel: '发布吞吐',
          secondaryLabel: '协同负载',
        },
        summaryTitles: {
          one: '管线健康',
          two: '今日协调',
          three: '放量阻塞',
          four: '运营风险',
        },
        kpis: {
          launches: '已发版本',
          backlog: '审核中应用',
          blocked: '阻塞应用',
          sla: '问题SLA',
        },
        sections: {
          areaEyebrow: '发布吞吐',
          areaTitle: '已发版本对目标',
          alertsEyebrow: '运营预警',
          alertsTitle: '影响发版和放量的风险',
          actionLabel: '建议步骤：',
          barEyebrow: '渠道执行',
          barTitle: '渠道执行健康度',
          barSubtitle: '看哪些渠道因素材、协同或激活疲软开始掉速',
          lineEyebrow: '队列健康',
          lineTitle: '审核队列与阻塞交接',
          tableEyebrow: '运营队列',
          tableTitle: '按应用看状态、阻塞和下一步',
        },
        stats: {
          first: '审核中应用',
          second: '阻塞交接',
        },
        statDetails: {
          first: '队列负载能直接反映审核与素材交付是否开始堆积。',
          second: '阻塞交接是本周协同效率是否下滑的最准信号。',
        },
        series: {
          areaPrimary: '已发',
          areaSecondary: '目标',
          bar: '执行健康度',
          lineFirst: '审核队列',
          lineSecond: '阻塞交接',
        },
        templates: {
          scopeFocus: (scopeLabel: string) => `${scopeLabel} 队列`,
          heroPrimaryDetail: (launchesLabel: string, backlog: number) =>
            `本周期已发 ${launchesLabel}，仍有 ${backlog} 个在审核流中。`,
          heroSecondaryChip: (blockedApps: number) => `${blockedApps} 个阻塞`,
          heroSecondaryDetail: (slaLabel: string, queueLabel: string) =>
            `问题 SLA 为 ${slaLabel}，${queueLabel} 仍在拖慢本周节奏。`,
          summaryOneHeadline: (launchesLabel: string, targetLabel: string) =>
            `已发 ${launchesLabel}，目标 ${targetLabel}。`,
          summaryOneDetail: (backlog: number, delayedApps: number) =>
            `${backlog} 个在审核队列，${delayedApps} 个有延期风险。`,
          summaryTwoDetail: (secondAction: string) => `随后：${secondAction}`,
          summaryThreeHeadline: (appName: string, blockerLabel: string) =>
            `${appName} 当前最影响放量，因为 ${blockerLabel}。`,
          summaryThreeDetail: (channelLabel: string) => `${channelLabel} 需要优先刷新执行面。`,
          summaryFourHeadline: (backlog: number) => `${backlog} 个应用已超过目标审核节奏。`,
          summaryFourDetail: (slaLabel: string, delayedApps: number) =>
            `问题响应为 ${slaLabel}，仍有 ${delayedApps} 个应用存在发版延迟风险。`,
          areaHeadline: (deltaLabel: string, abovePlan: boolean) =>
            abovePlan ? `较目标多发 ${deltaLabel}` : `较目标少发 ${deltaLabel}`,
          barTileChip: (statusLabel: string) => statusLabel,
          lineBadge: (slaLabel: string) => `SLA ${slaLabel}`,
          tableHeadline: (count: number, scopeLabel: string, dateRangeLabel: string) =>
            `${count} 个应用 • ${scopeLabel} • ${dateRangeLabel}`,
          emptyTableMessage: '当前筛选下没有匹配的运营队列数据，建议放宽范围查看。',
        },
      },
    },
    filters: {
      dateRange: '时间',
      app: '应用',
      channel: '渠道',
      region: '区域',
    },
    options: {
      dateRange: {
        '30d': '近30天',
        qtd: '本季度',
        '6m': '近6个月',
      },
      app: {
        all: '全部应用',
        'atlas-home': 'Atlas Home',
        pulsepath: 'PulsePath',
        'creator-studio': 'Creator Studio',
        'ledger-flow': 'Ledger Flow',
        'nurture-loop': 'Nurture Loop',
        'travel-scout': 'Travel Scout',
      },
      channel: {
        all: '全部渠道',
        organic: '自然流量',
        'paid-social': '付费社媒',
        'search-ads': 'Apple Search Ads',
        'lifecycle-crm': '生命周期CRM',
        'creator-partnerships': '创作者合作',
      },
      region: {
        all: '全部区域',
        na: '北美',
        emea: 'EMEA',
        apac: 'APAC',
        latam: '拉美',
      },
      month: {
        Jan: '1月',
        Feb: '2月',
        Mar: '3月',
        Apr: '4月',
        May: '5月',
        Jun: '6月',
      },
    },
    statusLabels: {
      'In Development': '开发中',
      'Waiting for Review': '待审核',
      Live: '已上线',
      Scaling: '放量中',
      Paused: '已暂停',
    },
    severityLabels: {
      high: '高',
      medium: '中',
      watch: '关注',
    },
    tableHeaders: {
      app: '应用',
      status: '状态',
      revenue: '收入',
      roi: 'ROI',
      revenueShare: '收入占比',
      lastRelease: '版本',
      risk: '风险',
      activation: '激活',
      d1: 'D1',
      d7: 'D7',
      dropOff: '流失点',
      issueFlag: '问题',
      suggestedAction: '建议',
      reviewStage: '审核阶段',
      queueState: '队列',
      channelStatus: '渠道状态',
      delayFlag: '延期',
      blocker: '阻塞',
      nextAction: '下一步',
    },
    categories: {
      'atlas-home': '智能家居订阅',
      pulsepath: '健康指导会员',
      'creator-studio': '创作者工具',
      'ledger-flow': '财务开票套件',
      'nurture-loop': 'CRM自动化测试',
      'travel-scout': '出行规划平台',
    },
    riskFlags: {
      healthy: '健康',
      concentration: '收入集中',
      retention: '留存回落',
      review: '审核风险',
      monetization: '变现偏弱',
      paused: '暂停拖累',
    },
    meta: {
      dropOff: {
        paywall_step3: '付费墙第3步',
        onboarding_step2: '引导第2步',
        template_picker: '模板选择',
        permissions_gate: '权限弹窗',
        trial_copy: '试用文案',
        search_blank_state: '搜索空态',
      },
      issueFlags: {
        revenue_mix_skew: '收入结构偏斜',
        release_retention_regression: '版本后留存回落',
        healthy_signal: '整体健康',
        review_queue_pressure: '审核队列压力',
        activation_gap: '激活偏弱',
        paused_efficiency: '暂停后仍拖效',
      },
      suggestedActions: {
        trim_paid_social_mix: '收紧付费社媒',
        rollback_onboarding_order: '回退引导顺序',
        extend_partner_tests: '扩大合作实验',
        clear_qa_signoff: '清理QA签核',
        tighten_trial_copy: '收紧试用文案',
        hold_spend_cleanup: '完成停投清理',
      },
      reviewStage: {
        live_monitoring: '线上监控',
        hotfix_review: '热修审核中',
        live_scaling: '线上放量',
        waiting_review: '等待审核',
        qa_pass: 'QA已过',
        paused_queue: '暂停队列',
      },
      queueState: {
        clear: '无积压',
        review_48h: '审核48h',
        partner_ready: '可放量',
        metadata_hold: '素材待补',
        cross_team_wait: '跨团队等待',
        paused: '已暂停',
      },
      channelStatus: {
        creative_aging: '素材老化',
        tiktok_uk_soft: 'TikTok UK偏弱',
        partner_fresh: '合作渠道稳定',
        asa_stable: 'ASA稳定',
        crm_soft: 'CRM偏弱',
        spend_paused: '投放暂停',
      },
      delayFlags: {
        none: '正常',
        hotfix_hold: '热修卡放量',
        review_risk: '审核有风险',
        copy_delay: '文案交付慢',
        paused_launch: '发版暂停',
      },
      blockers: {
        creative_refresh: '素材刷新还没完成',
        android_hotfix: 'Android热修还没发出',
        none: '当前没有明显阻塞',
        qa_signoff: '最终QA签核未关',
        pricing_copy: '定价文案未定稿',
        demand_pause: '投放暂停待清理',
      },
      nextActions: {
        approve_refresh: '周四前批完新素材',
        ship_patch: '先发补丁再看D1',
        open_next_test: '开启下一轮合作实验',
        escalate_review: '今天升级审核包',
        lock_trial_copy: '发版前定稿试用文案',
        close_pause_items: '本周关完暂停清单',
      },
      channelPills: {
        strong: '健康',
        mixed: '一般',
        weak: '偏弱',
      },
    },
    alerts: {
      executive: {
        concentration: {
          title: '前两大应用收入占比过高',
          detail: '组合增长过度依赖头部应用，版本波动和收入结构风险都在放大。',
          action: '下周把更多资源转向 ROI 次高的应用，先把收入集中度压下来。',
        },
        backlog: {
          title: '审核积压拖慢下一波增长',
          detail: '多个版本仍卡在审核链路，后续的变现和放量节奏正在被延后。',
          action: '优先清掉最接近放量门槛的两个应用发布包。',
        },
        pausedSpend: {
          title: '有暂停应用仍在消耗预算',
          detail: '某个暂停应用还有残余渠道成本，没有继续留在当前组合里的理由。',
          action: '尽快完成停投清理，把剩余预算回收到更健康的渠道。',
        },
      },
      pm: {
        retentionDrop: {
          title: '引导顺序调整后留存回落',
          detail: '新版引导拉高了安装，但付费 cohort 的早期留存明显变差。',
          action: '先恢复更稳的引导顺序，明天复看 D1 和 D7。',
        },
        activationGap: {
          title: 'TikTok UK 点击高但激活弱',
          detail: '前链路点击还可以，但真正进入产品关键路径的人不够。',
          action: '先收紧商店页意图和低质素材，再继续放量。',
        },
        releaseTradeoff: {
          title: '最新版本带来安装，但伤了 D1',
          detail: '版本上线后商店表现更好，但首日产品质量同步走弱。',
          action: '先发小修复处理引导问题，再复测版本文案。',
        },
      },
      ops: {
        reviewSla: {
          title: '2 个应用审核已超目标 SLA',
          detail: '商店审核已成为本周发版节奏的最大阻塞点。',
          action: '今天升级审核包，并让 QA 和素材负责人进入同一条协同链路。',
        },
        creativeRefresh: {
          title: '有放量应用缺素材刷新，效率在掉',
          detail: '新素材没有按节奏补上，渠道执行质量开始下滑。',
          action: '把素材审批提前，下一波投放前先替换掉老素材。',
        },
        handoffDelay: {
          title: '跨团队交接延误，影响本周发版',
          detail: '应用本身已接近可发，但还有一个跨团队依赖没关掉。',
          action: '今天确认唯一责任人，EOD 前锁定最终发版清单。',
        },
      },
    },
  },
} as const

export type DashboardCopy = (typeof dashboardCopy)[Language]

export function getDashboardCopy(language: Language) {
  return dashboardCopy[language]
}

export function getLocalizedOptions<T extends { value: string }>(
  language: Language,
  group: keyof DashboardCopy['options'],
  options: readonly T[],
) {
  const labels = getDashboardCopy(language).options[group]

  return options.map((option) => ({
    ...option,
    label: labels[option.value as keyof typeof labels] ?? option.value,
  }))
}

export function getLocalizedRoleOptions(language: Language) {
  const roles = getDashboardCopy(language).roles

  return roleOptions.map((option) => ({
    value: option.value,
    label: roles[option.value].label,
  }))
}
