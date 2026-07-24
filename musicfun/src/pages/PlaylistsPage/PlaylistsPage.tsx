import { Pagination, SearchInput, TagsDropdown } from '@/common/components'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { useState, type ChangeEvent } from 'react'
import s from './PlaylistsPage.module.css'
import { PlaylistsList } from '@/features/playlists/ui'
import { useDebounceValue } from '@/common/hooks'
import type { Tag } from '@/common/types'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState(allTags.slice(0, 3))

  const debounceSearch = useDebounceValue(search)
  const { data: playlists, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  })

  if (isLoading) return <div>Loading...</div>
  if (!playlists?.data.length) return <div>No playlists found</div>

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
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

  return (
    <section className={s.section}>
      <div className={s.header}>
        <h1>All playlists</h1>
        <SearchInput
          callback={searchHandler}
          placeholder={'Search playlist by title'}
        />
        <h4>Hashtags</h4>
        <TagsDropdown
          tags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onRemoveTag={handleRemoveTag}
          maxVisible={2}
          isAuth={true}
        />
        <div
          style={{
            width: '328px',
            height: '22px',
            backgroundColor: 'blue',
          }}
        >
          СОРТИРОВКА
        </div>
      </div>
      <div className={s.content}>
        <PlaylistsList playlists={playlists.data} variant="full" />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagesCount={playlists?.meta.pagesCount || 1}
        />
      </div>
    </section>
  )
}
