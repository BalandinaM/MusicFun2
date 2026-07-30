import type { SortDirection, SortOption } from '@/features/playlists/api'
import { SORT_OPTIONS } from '@/features/playlists/model'

type Props = {
  sortBy: SortOption
  sortDirection: SortDirection
  onSortChange: (sortBy: SortOption, sortDirection: SortDirection) => void
}

export const SortDropdown = ({
  sortBy,
  sortDirection,
  onSortChange,
}: Props) => {
  const value = `${sortBy}:${sortDirection}`

  return (
    <select
      value={value}
      onChange={e => {
        const [nextSortBy, nextSortDirection] = e.target.value.split(':') as [
          SortOption,
          SortDirection,
        ]

        onSortChange(nextSortBy, nextSortDirection)
      }}
    >
      {SORT_OPTIONS.map(item => (
        <option
          key={`${item.sortBy}-${item.direction}`}
          value={`${item.sortBy}:${item.direction}`}
        >
          {item.name}
        </option>
      ))}
    </select>
  )
}
