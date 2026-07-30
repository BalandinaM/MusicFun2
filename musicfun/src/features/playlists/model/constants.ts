import type { SortDirection, SortOption } from '../api'

export const SORT_OPTIONS: {
  name: string
  sortBy: SortOption
  direction: SortDirection
}[] = [
  { name: 'Newest first', sortBy: 'addedAt', direction: 'desc' },
  { name: 'Oldest first', sortBy: 'addedAt', direction: 'asc' },
  { name: 'Most popular', sortBy: 'likesCount', direction: 'desc' },
  { name: 'Least popular', sortBy: 'likesCount', direction: 'asc' },
] as const
