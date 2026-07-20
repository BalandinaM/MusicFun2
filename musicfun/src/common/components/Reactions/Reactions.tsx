import { LikeIcon, DislikeIcon } from '../Icons'
import type { PlaylistAttributes } from '@/features/playlists/api'
import s from './Reactions.module.css'
import { CurrentUserReaction as UserReaction } from '@/common/enums'
import type { CurrentUserReaction } from '@/common/types/types'
import { useState } from 'react'
import {
  useDislikePlaylistMutation,
  useLikePlaylistMutation,
} from '@/features/playlists/api/playlistsApi'

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
      <button
        // className={isLiked === UserReaction.Like ? s.button : ''}
        onClick={() => handleLikeReaction(playlistId)}
      >
        <LikeIcon />
        <span>{data.likesCount}</span>
      </button>
      <button
        onClick={() => handleDisLikeReaction(playlistId)}
        //   className={isLiked === UserReaction.Dislike ? s.button : ''}
      >
        <DislikeIcon />
      </button>
    </div>
  )
}
