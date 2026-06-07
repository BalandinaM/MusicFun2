import {
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi'
import s from './PlaylistCover.module.css'
import type { ChangeEvent } from 'react'
import defaultCover from '@/assets/images/defaultCover.png'
import type { Images } from '@/common/types'
import { toast } from 'react-toastify'

type Props = {
  playlistId: string
  images: Images
}

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const originalCover = images.main?.find(img => img.type === 'original')
  const src = originalCover ? originalCover?.url : defaultCover

  const [uploadCover] = useUploadPlaylistCoverMutation()
  const [deleteCover] = useDeletePlaylistCoverMutation()

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024 // 1 MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.length && event.target.files[0]
    if (!file) return

    if (!allowedTypes.includes(file.type)) {
      toast('Only JPEG, PNG or GIF images are allowed', {
        type: 'error',
        theme: 'colored',
      })
      return
    }

    if (file.size > maxSize) {
      toast(
        `The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`,
        {
          type: 'error',
          theme: 'colored',
        }
      )
      return
    }

    uploadCover({ playlistId: playlistId, file })
  }

  const deleteCoverHandler = () => {
    deleteCover({ playlistId: playlistId })
  }
  return (
    <>
      <img src={src} alt="Cover" width={'240px'} className={s.cover} />
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={uploadCoverHandler}
      />
      <button onClick={() => deleteCoverHandler()}>delete cover</button>
    </>
  )
}
