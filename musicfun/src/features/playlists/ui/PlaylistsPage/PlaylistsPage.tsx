import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm'
import s from './PlaylistsPage.module.css'

import { PlaylistItem } from './PlaylistItem/PlaylistItem'
import { EditPlaylistForm } from './EditPlaylistForm/EditPlaylistForm'
import type { UpdatePlaylistArgs, PlaylistData } from '../../api'
import {
  useFetchPlaylistsQuery,
  useDeletePlaylistMutation,
} from '../../api/playlistsApi'
import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components'

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const debounceSearch = useDebounceValue(search)
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
  })
  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map(t => t.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        onChange={e => setSearch(e.currentTarget.value)}
        placeholder={'Search playlist by title'}
      />
      <div className={s.items}>
        {!data?.data.length && !isLoading && <h2>Плейлист не найден</h2>}
        {data?.data.map(playlist => {
          const isEditing = playlistId === playlist.id

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  handleSubmit={handleSubmit}
                  register={register}
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylistHandler={deletePlaylistHandler}
                  editPlaylistHandler={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
      />
    </div>
  )
}
