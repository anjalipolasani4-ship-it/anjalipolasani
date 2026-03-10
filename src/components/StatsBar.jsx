import { TrendingUp, Briefcase, MessageSquare, Star, XCircle } from 'lucide-react'
import { STATUS_CONFIG } from '../constants'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{label}</span>
        <Icon size={14} className={color} />
      </div>
      <div className={`text-4xl font-bold font-mono ${color}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value } = payload[0]
    return (
      <div className="glass rounded-xl px-3 py-2 text-xs">
        <span className="font-mono text-slate-300">{name}: </span>
        <span className="font-bold text-white">{value}</span>
      </div>
    )
  }
  return null
}

export default function StatsBar({ stats }) {
  const { total, byStatus, responseRate } = stats

  const pieData = Object.entries(byStatus)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value, color: STATUS_CONFIG[name].hex }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Briefcase} label="Total" value={total} color="text-slate-300" sub="jobs tracked" />
        <StatCard icon={MessageSquare} label="Interviews" value={byStatus.Interview} color="text-amber-400" sub="in progress" />
        <StatCard icon={Star} label="Offers" value={byStatus.Offer} color="text-green-400" sub="received" />
        <StatCard icon={TrendingUp} label="Response Rate" value={`${responseRate}%`} color="text-sky-400" sub="interview + offer / total" />
      </div>

      {total > 0 && (
        <div className="glass rounded-2xl p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Pipeline Breakdown</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 flex-1">
              {Object.entries(byStatus).map(([status, count]) => {
                const cfg = STATUS_CONFIG[status]
                const pct = total > 0 ? Math.round((count / total) * 100) : 0
                return (
                  <div key={status} className="flex items-center gap-2 min-w-[120px]">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                    <div>
                      <div className="text-xs text-slate-400">{status}</div>
                      <div className="text-sm font-mono font-semibold text-white">
                        {count} <span className="text-slate-500 text-xs">({pct}%)</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
