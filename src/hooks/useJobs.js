import { useState, useEffect, useMemo } from 'react'

const STORAGE_KEY = 'jobtracker_jobs'

const SAMPLE_JOBS = [
  { id: '1', company: 'Stripe', role: 'Frontend Engineer', location: 'Remote', salary: '$140k–$170k', status: 'Interview', appliedDate: '2024-01-10', notes: 'Had a great first call with the recruiter.', url: 'https://stripe.com/jobs' },
  { id: '2', company: 'Linear', role: 'Product Designer', location: 'San Francisco, CA', salary: '$130k–$160k', status: 'Applied', appliedDate: '2024-01-14', notes: '', url: '' },
  { id: '3', company: 'Vercel', role: 'Senior React Engineer', location: 'Remote', salary: '$160k–$190k', status: 'Offer', appliedDate: '2024-01-05', notes: 'Offer letter received! Negotiating equity.', url: 'https://vercel.com/careers' },
  { id: '4', company: 'Figma', role: 'Full Stack Engineer', location: 'New York, NY', salary: '$150k–$180k', status: 'Rejected', appliedDate: '2023-12-20', notes: 'Rejected after technical round.', url: '' },
  { id: '5', company: 'Notion', role: 'React Developer', location: 'Remote', salary: '$120k–$145k', status: 'Applied', appliedDate: '2024-01-16', notes: '', url: '' },
]

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function saveToStorage(jobs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch {}
}

export function useJobs() {
  const [jobs, setJobs] = useState(() => loadFromStorage() ?? SAMPLE_JOBS)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date_desc')

  useEffect(() => {
    saveToStorage(jobs)
  }, [jobs])

  const addJob = (job) => {
    const newJob = { ...job, id: crypto.randomUUID() }
    setJobs(prev => [newJob, ...prev])
  }

  const updateJob = (id, updated) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updated } : j))
  }

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }

  const filteredJobs = useMemo(() => {
    let result = [...jobs]

    if (filterStatus !== 'All') {
      result = result.filter(j => j.status === filterStatus)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(j =>
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q) ||
        j.location?.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => {
      if (sortBy === 'date_desc') return new Date(b.appliedDate) - new Date(a.appliedDate)
      if (sortBy === 'date_asc') return new Date(a.appliedDate) - new Date(b.appliedDate)
      if (sortBy === 'company') return a.company.localeCompare(b.company)
      return 0
    })

    return result
  }, [jobs, search, filterStatus, sortBy])

  const stats = useMemo(() => {
    const total = jobs.length
    const byStatus = {
      Applied: jobs.filter(j => j.status === 'Applied').length,
      Interview: jobs.filter(j => j.status === 'Interview').length,
      Offer: jobs.filter(j => j.status === 'Offer').length,
      Rejected: jobs.filter(j => j.status === 'Rejected').length,
    }
    const responseRate = total > 0
      ? Math.round(((byStatus.Interview + byStatus.Offer) / total) * 100)
      : 0
    return { total, byStatus, responseRate }
  }, [jobs])

  return {
    jobs,
    filteredJobs,
    stats,
    search, setSearch,
    filterStatus, setFilterStatus,
    sortBy, setSortBy,
    addJob, updateJob, deleteJob,
  }
}
