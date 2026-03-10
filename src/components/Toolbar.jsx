import { Search, SlidersHorizontal } from 'lucide-react'
import { STATUSES, STATUS_CONFIG } from '../constants'

const inputCls = "bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all w-full"

export default function Toolbar({ search, setSearch, filterStatus, setFilterStatus, sortBy, setSortBy, total, filtered }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            className={`${inputCls} pl-9`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company, role, location..."
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <select
            className={`${inputCls} pl-9 pr-8 w-full sm:w-44 appearance-none cursor-pointer`}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="company">Company A–Z</option>
          </select>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all border ${
            filterStatus === 'All'
              ? 'bg-white/10 text-white border-white/20'
              : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-border'
          }`}
        >
          All ({total})
        </button>
        {STATUSES.map(s => {
          const cfg = STATUS_CONFIG[s]
          const active = filterStatus === s
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all border ${
                active
                  ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                  : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-border'
              }`}
            >
              {s}
            </button>
          )
        })}
        {filtered !== total && (
          <span className="ml-auto text-xs text-slate-500 font-mono">
            {filtered} result{filtered !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  )
}
