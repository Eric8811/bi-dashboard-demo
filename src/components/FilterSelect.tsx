import { ChevronDown } from 'lucide-react'

type FilterOption = {
  value: string
  label: string
}

type FilterSelectProps = {
  label: string
  value: string
  options: readonly FilterOption[]
  onChange: (value: string) => void
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 transition duration-300 hover:border-white/15 hover:bg-slate-950/60">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </div>
      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none bg-transparent pr-8 text-sm font-medium text-white outline-none sm:text-[15px]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-950 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </label>
  )
}
