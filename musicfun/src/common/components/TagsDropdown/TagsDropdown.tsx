import { useState } from 'react'
import s from './TagsDropdown.module.css'
import { Chip } from '../Chip/Chip'
import { ArrowIcon } from '../Icons'

type Tag = {
  id: string
  name: string
}

type Props = {
  tags: Tag[]
  selectedTags: Tag[]
  onToggleTag: (tag: Tag) => void
  onRemoveTag?: (tag: Tag) => void
  maxVisible?: number
  isAuth?: boolean
}

export const TagsDropdown = ({
  tags,
  selectedTags,
  onToggleTag,
  onRemoveTag,
  maxVisible = 5,
  isAuth = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const visibleTags = selectedTags.slice(0, maxVisible)
  const hiddenCount = selectedTags.length - maxVisible

  const handleChipClick = () => {
    if (tags.length > 0) {
      setIsOpen(!isOpen)
    }
  }

  const handleToggle = (tag: Tag) => {
    onToggleTag(tag)
  }

  const handleRemove = (tag: Tag) => {
    onRemoveTag?.(tag)
  }

  const hasTags = tags.length > 0

  return (
    <div className={s.wrap}>
      <div className={s.chips} onClick={handleChipClick}>
        {selectedTags.length === 0 ? (
          <span className={s.placeholder}>
            {hasTags ? 'Select tags...' : 'No tags available'}
          </span>
        ) : (
          <>
            {visibleTags.map(tag => (
              <Chip
                key={tag.id}
                label={tag.name}
                isAuth={isAuth}
                className={s.chip}
                removable={true}
                onRemove={() => handleRemove(tag)}
              />
            ))}

            {hiddenCount > 0 && (
              <span className="text-tag-link">and {hiddenCount} more</span>
            )}
          </>
        )}

        <ArrowIcon className={`${s.chevron} ${isOpen ? s.open : ''}`} />
      </div>

      {isOpen && hasTags && (
        <div className={s.dropdown}>
          {tags.map(tag => {
            const isSelected = selectedTags.some(t => t.id === tag.id)

            return (
              <label
                key={tag.id}
                className={`${s.option} ${isSelected ? s.selected : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(tag)}
                />
                <span>#{tag.name}</span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
