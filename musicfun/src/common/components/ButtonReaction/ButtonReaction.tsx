import { LikeIcon, DislikeIcon } from '../Icons'
import s from './ButtonReaction.module.css'
import type { CurrentUserReaction } from '@/common/types/types'

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
        <div className={s.wrap}>
          <LikeIcon />
          <span className="text-body-xs">{likesCount}</span>
        </div>
      )}
      {variant === 'dislike' && <DislikeIcon />}
    </button>
  )
}
