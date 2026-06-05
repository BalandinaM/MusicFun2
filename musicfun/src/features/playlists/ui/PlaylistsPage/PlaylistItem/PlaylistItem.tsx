import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types'
import defaultCover from '@/assets/images/defaultCover.png'
import s from './PlaylistItem.module.css'
import { useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi'
import type { ChangeEvent, ChangeEventHandler } from 'react'

type Props = {
  playlist: PlaylistData
  deletePlaylistHandler: (playlistId: string) => void
  editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({
  playlist,
  deletePlaylistHandler,
  editPlaylistHandler,
}: Props) => {
  const originalCover = playlist.attributes.images.main?.find(
    img => img.type === 'original'
  )
  const src = originalCover ? originalCover?.url : defaultCover

  const [uploadCover] = useUploadPlaylistCoverMutation()

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length && event.target.files[0]
    if (!file) return
    uploadCover({ playlistId: playlist.id, file })
  }

  return (
    <div>
      <img src={src} alt="Cover" width={'240px'} className={s.cover} />
      <input type="file" onChange={uploadCoverHandler} />
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <div>
        <button onClick={() => deletePlaylistHandler(playlist.id)}>
          delete
        </button>
        <button onClick={() => editPlaylistHandler(playlist)}>update</button>
      </div>
    </div>
  )
}
