import { LikeIcon, DislikeIcon } from '../Icons'
import type { PlaylistAttributes } from '@/features/playlists/api'
import s from './Reactions.module.css'
import {
  useDislikePlaylistMutation,
  useLikePlaylistMutation,
} from '@/features/playlists/api/playlistsApi'
import type { CurrentUserReaction } from '@/common/types/types'

type Props = {
  data: PlaylistAttributes
  playlistId: string
}

export const Reactions = ({ data, playlistId }: Props) => {
  //   const [isLiked, setIsLiked] = useState<CurrentUserReaction>(
  //     data.currentUserReaction
  //   )
  //   console.log(isLiked)
  const [postLikeReaction] = useLikePlaylistMutation()
  const [postDislikeReaction] = useDislikePlaylistMutation()

  const handleLikeReaction = (playlistId: string) => {
    postLikeReaction({ playlistId })
  }

  const handleDisLikeReaction = (playlistId: string) => {
    postDislikeReaction({ playlistId })
  }

  return (
    <div>
      <ButtonReaction
        variant="like"
        playlistId={playlistId}
        callback={handleLikeReaction}
        userReaction={data.currentUserReaction}
        likesCount={data.likesCount}
      />
      <ButtonReaction
        variant="dislike"
        playlistId={playlistId}
        callback={handleDisLikeReaction}
        userReaction={data.currentUserReaction}
      />
    </div>
  )
}

type PropsButton = {
  variant: 'like' | 'dislike'
  playlistId: string
  callback: (playlistId: string) => void
  userReaction: CurrentUserReaction
  likesCount?: number
}

export const ButtonReaction = ({
  variant,
  playlistId,
  callback,
  userReaction,
  likesCount,
}: PropsButton) => {
  const isActive =
    (variant === 'like' && userReaction === 1) ||
    (variant === 'dislike' && userReaction === -1)

  return (
    <button
      onClick={() => callback(playlistId)}
      className={isActive ? s.active : ''}
    >
      {variant === 'like' && (
        <>
          <LikeIcon />
          <span>{likesCount}</span>
        </>
      )}
      {variant === 'dislike' && <DislikeIcon />}
    </button>
  )
}
