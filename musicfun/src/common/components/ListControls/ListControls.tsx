import type { Tag } from '@/common/types'
import { TagsDropdown } from '../TagsDropdown/TagsDropdown'
import s from './ListControls.module.css'
import { SortDropdown } from '../SortDropdown/SortDropdown'
import type { SortDirection, SortOption } from '@/features/playlists/api'
import { PageTitle } from '../PageTitle/PageTitle'
import { SearchInput } from '../SearchInput/SearchInput'
import type { ChangeEvent } from 'react'

type Props = {
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
  searchBy: string
  availableTags: Tag[]
  selectedTags: Tag[]
  handleToggleTag: (tag: Tag) => void
  handleRemoveTag?: (tag: Tag) => void
  maxVisible?: number
  isAuth?: boolean
  sortBy: SortOption
  sortDirection: SortDirection
  handleSortChange: (sortBy: SortOption, sortDirection: SortDirection) => void
}

export const ListControls = ({
  searchHandler,
  searchBy,
  availableTags,
  selectedTags,
  handleToggleTag,
  handleRemoveTag,
  maxVisible,
  isAuth,
  sortBy,
  sortDirection,
  handleSortChange,
}: Props) => {
  return (
    <div className={s.header}>
      <PageTitle className={s.title}>All playlists</PageTitle>
      <SearchInput callback={searchHandler} searchBy={searchBy} />
      <h4 className={s.subtitle}>Hashtags</h4>
      <TagsDropdown
        tags={availableTags}
        selectedTags={selectedTags}
        onToggleTag={handleToggleTag}
        onRemoveTag={handleRemoveTag}
        maxVisible={maxVisible}
        isAuth={isAuth}
      />
      <SortDropdown
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </div>
  )
}
