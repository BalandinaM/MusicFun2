import type { PlaylistData } from '@/features/playlists/api'
import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardPlaylist.module.css'
import { getDaysAgoText } from '@/common/utils'
import { ButtonReaction } from '../ButtonReaction/ButtonReaction'
import {
  useLikePlaylistMutation,
  useDislikePlaylistMutation,
  useRemoveReactionPlaylistMutation,
} from '@/features/playlists/api/playlistsApi'

type Props = {
  playlist: PlaylistData
}

export const CardPlalist = ({ playlist }: Props) => {
  const [postLikeReaction] = useLikePlaylistMutation()
  const [postDislikeReaction] = useDislikePlaylistMutation()
  const [removeReaction] = useRemoveReactionPlaylistMutation()
  const data = playlist.attributes
  const thumbnailCover = data.images.main.find(img => img.type === 'thumbnail')
  const src = thumbnailCover ? thumbnailCover?.url : defaultCover

  const handleLikeReaction = (playlistId: string) => {
    postLikeReaction({ playlistId })
  }

  const handleDisLikeReaction = (playlistId: string) => {
    postDislikeReaction({ playlistId })
  }

  const handleRemoveReaction = (playlistId: string) => {
    removeReaction({ playlistId })
  }

  return (
    <div className={s.card}>
      <img src={src} alt="Cover" width={'174px'} className={s.cover} />
      <h4 className="text-body-md text-truncate">{data.title}</h4>
      <p className="text-meta text-truncate">
        Made for
        <span className="text-meta-underline"> {data.user.name}</span>
      </p>
      <p className="text-meta text-truncate">
        {data.tracksCount} Tracks • Created {getDaysAgoText(data.addedAt)}
      </p>
      <div className={s.wrapButton}>
        <ButtonReaction
          variant="like"
          elemId={playlist.id}
          handleReaction={handleLikeReaction}
          removeReaction={handleRemoveReaction}
          userReaction={data.currentUserReaction}
          likesCount={data.likesCount}
        />
        <ButtonReaction
          variant="dislike"
          elemId={playlist.id}
          handleReaction={handleDisLikeReaction}
          removeReaction={handleRemoveReaction}
          userReaction={data.currentUserReaction}
        />
      </div>
    </div>
  )
}
