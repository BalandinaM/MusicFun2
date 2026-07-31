import {
  Pagination,
  PageTitle,
  SearchInput,
  SortDropdown,
  TagsDropdown,
} from '@/common/components'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { useState, type ChangeEvent } from 'react'
import s from './PlaylistsPage.module.css'
import { PlaylistsList } from '@/features/playlists/ui'
import { useDebounceValue } from '@/common/hooks'
import type { Tag } from '@/common/types'
import type { SortDirection, SortOption } from '@/features/playlists/api'
import { useSearchParams } from 'react-router'

const PAGE_SIZE = 10

const allTags = [
  { id: '1', name: 'Playlists' },
  { id: '2', name: 'Artists' },
  { id: '3', name: 'Albums' },
  { id: '4', name: 'Podcast' },
  { id: '5', name: 'Rock' },
  { id: '6', name: 'Indie' },
  { id: '7', name: 'Pop' },
  { id: '8', name: 'Jazz' },
]

export const PlaylistsPage = () => {
  const [selectedTags, setSelectedTags] = useState(allTags.slice(0, 3))
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const sortBy = (searchParams.get('sortBy') as SortOption) || 'addedAt'
  const sortDirection =
    (searchParams.get('sortDirection') as SortDirection) || 'desc'
  const currentPage = Number(searchParams.get('page')) || 1

  const debounceSearch = useDebounceValue(search)
  const debounceSortBy = useDebounceValue(sortBy)
  const debounceSortDirection = useDebounceValue(sortDirection)

  const { data: playlists, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    sortBy: debounceSortBy,
    sortDirection: debounceSortDirection,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  })

  if (isLoading) return <div>Loading...</div>
  if (!playlists?.data.length) return <div>No playlists found</div>

  const updateFilters = (
    updates: Record<string, string | number | null | undefined>,
    options?: { resetSort?: boolean }
  ) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })

      if (options?.resetSort) {
        params.delete('sortBy')
        params.delete('sortDirection')
      }

      params.set('page', '1')

      return params
    })
  }

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.currentTarget.value }, { resetSort: true })
  }

  const handleSortChange = (
    nextSortBy: SortOption,
    nextSortDirection: SortDirection
  ) => {
    updateFilters({
      sortBy: nextSortBy,
      sortDirection: nextSortDirection,
    })
  }

  const handleToggleTag = (tag: Tag) => {
    setSelectedTags(prev =>
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    )
  }

  const handleRemoveTag = (tag: Tag) => {
    setSelectedTags(prev => prev.filter(t => t.id !== tag.id))
  }

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('page', String(page))
      return params
    })
  }

  return (
    <section className={s.section}>
      <div className={s.header}>
        <PageTitle className={s.title}>All playlists</PageTitle>
        <SearchInput
          callback={searchHandler}
          placeholder={'Search playlist by title'}
        />
        <h4 className={s.subtitle}>Hashtags</h4>
        <TagsDropdown
          tags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onRemoveTag={handleRemoveTag}
          maxVisible={2}
          isAuth={true}
        />
        <SortDropdown
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      </div>
      <div className={s.content}>
        <PlaylistsList playlists={playlists.data} variant="full" />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          pagesCount={playlists?.meta.pagesCount || 1}
        />
      </div>
    </section>
  )
}
