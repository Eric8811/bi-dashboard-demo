type SegmentedOption = {
  value: string
  label: string
}

type SegmentedControlProps = {
  label: string
  value: string
  options: readonly SegmentedOption[]
  onChange: (value: string) => void
}

export function SegmentedControl({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <div className="inline-flex flex-wrap rounded-full border border-white/10 bg-slate-950/65 p-1 backdrop-blur">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-3.5 ${
              value === option.value
                ? 'bg-white text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
