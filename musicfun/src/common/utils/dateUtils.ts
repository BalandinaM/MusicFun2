export const getDaysPassed = (dateStr: string): number => {
  const pastDate = new Date(dateStr)
  const currentDate = new Date()
  const diffInMs = currentDate.getTime() - pastDate.getTime()
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
}

export const getDaysAgoText = (dateStr: string): string => {
  const days = getDaysPassed(dateStr)

  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}
