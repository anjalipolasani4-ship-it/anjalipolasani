import { useState, useEffect } from 'react'
import { X, Briefcase, MapPin, DollarSign, Calendar, Link, FileText } from 'lucide-react'
import { STATUSES, STATUS_CONFIG } from '../constants'

const EMPTY = {
  company: '',
  role: '',
  location: '',
  salary: '',
  status: 'Applied',
  appliedDate: new Date().toISOString().split('T')[0],
  notes: '',
  url: '',
}

function Field({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
        {Icon && <Icon size={11} />}
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"

export default function JobForm({ job, onSave, onClose }) {
  const [form, setForm] = useState(job ? { ...job } : { ...EMPTY })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.company.trim() || !form.role.trim()) return
    onSave(form)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(7,11,20,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
        <div className="sticky top-0 glass rounded-t-3xl px-6 pt-6 pb-4 flex items-center justify-between border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {job ? 'Edit Application' : 'Add Application'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Track your next opportunity</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company *" icon={Briefcase}>
              <input
                className={inputCls}
                value={form.company}
                onChange={set('company')}
                placeholder="e.g. Stripe"
                required
              />
            </Field>
            <Field label="Role *" icon={Briefcase}>
              <input
                className={inputCls}
                value={form.role}
                onChange={set('role')}
                placeholder="e.g. Frontend Engineer"
                required
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Location" icon={MapPin}>
              <input
                className={inputCls}
                value={form.location}
                onChange={set('location')}
                placeholder="Remote / City, ST"
              />
            </Field>
            <Field label="Salary Range" icon={DollarSign}>
              <input
                className={inputCls}
                value={form.salary}
                onChange={set('salary')}
                placeholder="e.g. $120k–$150k"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select
                className={inputCls}
                value={form.status}
                onChange={set('status')}
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Applied Date" icon={Calendar}>
              <input
                type="date"
                className={inputCls}
                value={form.appliedDate}
                onChange={set('appliedDate')}
              />
            </Field>
          </div>

          <Field label="Job URL" icon={Link}>
            <input
              className={inputCls}
              value={form.url}
              onChange={set('url')}
              placeholder="https://..."
              type="url"
            />
          </Field>

          <Field label="Notes" icon={FileText}>
            <textarea
              className={`${inputCls} resize-none h-24`}
              value={form.notes}
              onChange={set('notes')}
              placeholder="Recruiter contact, interview notes, next steps..."
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-slate-400 hover:text-white hover:border-slate-500 text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-all shadow-lg shadow-sky-500/20"
            >
              {job ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
