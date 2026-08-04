import { useEffect, useRef, useState } from 'react'
import type { SortDirection, SortOption } from '@/features/playlists/api'
import { SORT_OPTIONS } from '@/features/playlists/model'
import { ArrowIcon } from '../Icons'
import s from './SortDropdown.module.css'

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
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const selectedOption = SORT_OPTIONS.find(
    item => item.sortBy === sortBy && item.direction === sortDirection
  )

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleOptionClick = (
    sortByOption: SortOption,
    direction: SortDirection
  ) => {
    onSortChange(sortByOption, direction)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={s.wrapper} ref={dropdownRef}>
      <div className={s.control}>
        <span className={`text-body-lg ${s.label}`}>Sort By</span>
        <span className={`text-body-md-underline ${s.selectedValue}`}>
          {selectedOption?.name}
        </span>
        <button type="button" className={s.toggleButton} onClick={handleToggle}>
          <ArrowIcon className={s.sortSelectArrow} />
        </button>
      </div>

      {isOpen && (
        <div className={s.dropdown}>
          {SORT_OPTIONS.map(item => {
            const isSelected =
              item.sortBy === sortBy && item.direction === sortDirection

            return (
              <button
                key={`${item.sortBy}-${item.direction}`}
                type="button"
                className={`${s.option} ${isSelected ? s.selected : ''}`}
                onClick={() => handleOptionClick(item.sortBy, item.direction)}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
