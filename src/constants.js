export const STATUS_CONFIG = {
  Applied: {
    label: 'Applied',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    dot: 'bg-sky-400',
    hex: '#38BDF8',
  },
  Interview: {
    label: 'Interview',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    dot: 'bg-amber-400',
    hex: '#FBBF24',
  },
  Offer: {
    label: 'Offer',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    dot: 'bg-green-400',
    hex: '#4ADE80',
  },
  Rejected: {
    label: 'Rejected',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
    dot: 'bg-red-400',
    hex: '#F87171',
  },
}

export const STATUSES = Object.keys(STATUS_CONFIG)
