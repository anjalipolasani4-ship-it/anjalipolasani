import { useState } from 'react'
import { Plus, Rocket } from 'lucide-react'
import { useJobs } from './hooks/useJobs'
import StatsBar from './components/StatsBar'
import JobCard from './components/JobCard'
import JobForm from './components/JobForm'
import Toolbar from './components/Toolbar'

export default function App() {
  const {
    filteredJobs, jobs, stats,
    search, setSearch,
    filterStatus, setFilterStatus,
    sortBy, setSortBy,
    addJob, updateJob, deleteJob,
  } = useJobs()

  const [formOpen, setFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  const openAdd = () => { setEditingJob(null); setFormOpen(true) }
  const openEdit = (job) => { setEditingJob(job); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setEditingJob(null) }

  const handleSave = (data) => {
    if (editingJob) {
      updateJob(editingJob.id, data)
    } else {
      addJob(data)
    }
  }

  const handleStatusChange = (id, status) => updateJob(id, { status })

  return (
    <div className="min-h-screen bg-bg">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Rocket size={18} className="text-sky-400" />
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">Job Tracker</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Your Career Pipeline
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {jobs.length === 0 ? 'Start by adding your first application' : `Tracking ${jobs.length} application${jobs.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-sky-500/20 active:scale-95"
          >
            <Plus size={16} />
            Add Job
          </button>
        </div>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Toolbar */}
        <Toolbar
          search={search} setSearch={setSearch}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          sortBy={sortBy} setSortBy={setSortBy}
          total={jobs.length}
          filtered={filteredJobs.length}
        />

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={openEdit}
                onDelete={deleteJob}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center">
              <Rocket size={28} className="text-sky-400" />
            </div>
            <div>
              <div className="font-semibold text-white">
                {search || filterStatus !== 'All' ? 'No results found' : 'No applications yet'}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                {search || filterStatus !== 'All'
                  ? 'Try adjusting your search or filter'
                  : 'Click "Add Job" to track your first application'}
              </div>
            </div>
            {!search && filterStatus === 'All' && (
              <button
                onClick={openAdd}
                className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 rounded-xl text-sm font-medium transition-all"
              >
                + Add your first job
              </button>
            )}
          </div>
        )}

        <p className="text-center text-xs text-slate-600 font-mono">
          Data saved locally in your browser
        </p>
      </div>

      {/* Modal */}
      {formOpen && (
        <JobForm
          job={editingJob}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  )
}
