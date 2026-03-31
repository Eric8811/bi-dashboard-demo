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
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <div className="inline-flex rounded-full border border-white/10 bg-slate-950/65 p-1 backdrop-blur">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
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
