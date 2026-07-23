import { Pagination, SearchInput } from '@/common/components'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { useState, type ChangeEvent } from 'react'
import s from './PlaylistsPage.module.css'
import { PlaylistsList } from '@/features/playlists/ui'
import { useDebounceValue } from '@/common/hooks'

const PAGE_SIZE = 10

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const debounceSearch = useDebounceValue(search)
  const { data: playlists, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  })

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  if (isLoading) return <div>Loading...</div>
  if (!playlists?.data.length) return <div>No playlists found</div>

  return (
    <section className={s.section}>
      <div className={s.header}>
        <h1>All playlists</h1>
        <SearchInput
          callback={searchHandler}
          placeholder={'Search playlist by title'}
        />
        <h4>Hashtags</h4>
        <div
          style={{
            width: '328px',
            height: '48px',
            backgroundColor: 'blueviolet',
          }}
        >
          ХЭШТЕГИ
        </div>
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
