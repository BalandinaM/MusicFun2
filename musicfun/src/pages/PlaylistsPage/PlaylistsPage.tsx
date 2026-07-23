import { Pagination } from '@/common/components'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { PlaylistList } from '@/features/playlists/ui'
import { CardPlaylistSmall } from '@/features/playlists/ui/PlaylistsContainer/CardPlaylistSmall/CardPlaylistSmall'
import { useState } from 'react'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data: playlists, isLoading } = useFetchPlaylistsQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
  })

  if (isLoading) return <div>Loading...</div>
  if (!playlists?.data.length) return <div>No playlists found</div>

  return (
    <section className={s.section}>
      <div className={s.header}>
        <h1>All playlists</h1>
        <p>Сюда встанет инпут, его вынести в отдельный компонент надо</p>
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
        <PlaylistList playlists={playlists.data} variant="full" />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagesCount={playlists?.meta.pagesCount || 1}
        />
      </div>
    </section>
  )
}
