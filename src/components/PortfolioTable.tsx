import type {
  PortfolioTableCell,
  PortfolioTableColumn,
  PortfolioTableRow,
} from '../data/dashboardData'

type PortfolioTableProps = {
  columns: PortfolioTableColumn[]
  rows: PortfolioTableRow[]
  emptyMessage: string
}

const badgeStyles = {
  slate: 'border-white/10 bg-white/5 text-slate-200',
  sky: 'border-sky-400/20 bg-sky-400/10 text-sky-100',
  emerald: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
  amber: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  rose: 'border-rose-400/20 bg-rose-400/10 text-rose-100',
} as const

const metricToneStyles = {
  default: 'text-white',
  positive: 'text-emerald-100',
  warning: 'text-amber-100',
  negative: 'text-rose-100',
} as const

function renderCell(cell: PortfolioTableCell) {
  switch (cell.kind) {
    case 'app':
      return (
        <>
          <div className="font-medium text-white">{cell.primary}</div>
          <div className="mt-1 text-xs text-slate-500">{cell.secondary}</div>
        </>
      )

    case 'badge':
      return (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] ${badgeStyles[cell.tone]}`}
        >
          {cell.primary}
        </span>
      )

    case 'metric':
      return (
        <>
          <div className={`font-medium ${metricToneStyles[cell.tone ?? 'default']}`}>{cell.primary}</div>
          {cell.secondary ? <div className="mt-1 text-xs text-slate-500">{cell.secondary}</div> : null}
        </>
      )

    case 'text':
      return (
        <>
          <div className={cell.tone === 'muted' ? 'text-slate-300' : 'text-white'}>{cell.primary}</div>
          {cell.secondary ? <div className="mt-1 text-xs text-slate-500">{cell.secondary}</div> : null}
        </>
      )
  }
}

export function PortfolioTable({ columns, rows, emptyMessage }: PortfolioTableProps) {
  if (!rows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/35 px-6 py-10 text-center text-sm text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="-mx-2 overflow-x-auto px-2">
      <table className="min-w-[1100px] w-full border-separate border-spacing-y-2 text-left">
        <thead>
          <tr className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-2 ${column.align === 'right' ? 'text-right' : ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="group">
              {columns.map((column, index) => {
                const isFirst = index === 0
                const isLast = index === columns.length - 1
                const rounding = isFirst
                  ? 'rounded-l-2xl border-r-0'
                  : isLast
                    ? 'rounded-r-2xl border-l-0'
                    : 'border-x-0'

                return (
                  <td
                    key={column.key}
                    className={`border border-white/10 bg-slate-950/45 px-4 py-4 align-top transition duration-300 group-hover:border-white/15 group-hover:bg-slate-950/60 ${rounding} ${
                      column.align === 'right' ? 'text-right' : ''
                    }`}
                  >
                    {renderCell(row.cells[column.key])}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
