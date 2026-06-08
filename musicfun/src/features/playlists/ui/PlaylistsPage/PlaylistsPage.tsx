import { useState, type ChangeEvent } from 'react'
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm'
import s from './PlaylistsPage.module.css'
import { useFetchPlaylistsQuery } from '../../api/playlistsApi'
import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components'
import { PlaylistsList } from './PlaylistsList/PlaylistsList'

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const debounceSearch = useDebounceValue(search)
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize: pageSize,
  })

  if (isLoading) return <h1>Skeleton loader...</h1>

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        onChange={searchPlaylistHandler}
        placeholder={'Search playlist by title'}
      />
      <PlaylistsList
        playlists={data?.data || []}
        isPlaylistsLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
