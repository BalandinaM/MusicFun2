import type { PlaylistData } from '@/features/playlists/api'
import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardPlaylist.module.css'
import { getDaysAgoText } from '@/common/utils'
import { ButtonReaction } from '../ButtonReaction/ButtonReaction'
import {
  useLikePlaylistMutation,
  useDislikePlaylistMutation,
} from '@/features/playlists/api/playlistsApi'

type Props = {
  playlist: PlaylistData
}

export const CardPlalist = ({ playlist }: Props) => {
  const [postLikeReaction] = useLikePlaylistMutation()
  const [postDislikeReaction] = useDislikePlaylistMutation()
  const data = playlist.attributes
  const thumbnailCover = data.images.main.find(img => img.type === 'thumbnail')
  const src = thumbnailCover ? thumbnailCover?.url : defaultCover

  const handleLikeReaction = (playlistId: string) => {
    postLikeReaction({ playlistId })
  }

  const handleDisLikeReaction = (playlistId: string) => {
    postDislikeReaction({ playlistId })
  }

  return (
    <div>
      <img src={src} alt="Cover" width={'174px'} className={s.cover} />
      <h4>{data.title}</h4>
      <p>
        <span>Made for </span>
        {data.user.name}
      </p>
      <p>
        {data.tracksCount} Tracks • Created {getDaysAgoText(data.addedAt)}
      </p>
      <div>
        <ButtonReaction
          variant="like"
          playlistId={playlist.id}
          callback={handleLikeReaction}
          userReaction={data.currentUserReaction}
          likesCount={data.likesCount}
        />
        <ButtonReaction
          variant="dislike"
          playlistId={playlist.id}
          callback={handleDisLikeReaction}
          userReaction={data.currentUserReaction}
        />
      </div>
    </div>
  )
}
