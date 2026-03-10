import { useState } from 'react'
import { MapPin, DollarSign, Calendar, ExternalLink, Trash2, Pencil, ChevronDown, FileText } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { STATUSES, STATUS_CONFIG } from '../constants'

function formatDate(d) {
  if (!d) return ''
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return d }
}

export default function JobCard({ job, onEdit, onDelete, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(job.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 2500)
    }
  }

  return (
    <div className="glass rounded-2xl overflow-hidden group transition-all duration-200 hover:border-slate-600/50 animate-fade-in">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Company avatar */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{
                background: `${STATUS_CONFIG[job.status].hex}15`,
                color: STATUS_CONFIG[job.status].hex,
                border: `1px solid ${STATUS_CONFIG[job.status].hex}25`,
              }}
            >
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-white truncate">{job.company}</div>
              <div className="text-sm text-slate-400 truncate">{job.role}</div>
            </div>
          </div>

          {/* Status + actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={job.status} />
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(job)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 flex items-center justify-center transition-all"
                title="Edit"
              >
                <Pencil size={12} />
              </button>
              <button
                onClick={handleDelete}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all text-slate-400 ${
                  confirmDelete
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-white/5 hover:bg-red-500/20 hover:text-red-400'
                }`}
                title={confirmDelete ? 'Click again to confirm' : 'Delete'}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {job.location}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1">
              <DollarSign size={11} />
              {job.salary}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(job.appliedDate)}
          </span>
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-500 hover:text-sky-400 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={11} />
              Listing
            </a>
          )}
        </div>

        {/* Status changer */}
        <div className="flex items-center gap-1.5 mt-4">
          {STATUSES.map(s => {
            const cfg = STATUS_CONFIG[s]
            const active = job.status === s
            return (
              <button
                key={s}
                onClick={() => onStatusChange(job.id, s)}
                title={s}
                className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-medium transition-all ${
                  active
                    ? `${cfg.bg} ${cfg.color} border ${cfg.border}`
                    : 'bg-white/0 text-slate-600 hover:text-slate-400 border border-transparent hover:border-slate-700'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>

        {/* Expand notes */}
        {job.notes && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1.5 mt-3 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <FileText size={11} />
            Notes
            <ChevronDown size={11} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
        {expanded && job.notes && (
          <p className="mt-2 text-xs text-slate-400 leading-relaxed bg-white/3 rounded-xl px-3 py-2 border border-border animate-fade-in">
            {job.notes}
          </p>
        )}
      </div>
    </div>
  )
}
