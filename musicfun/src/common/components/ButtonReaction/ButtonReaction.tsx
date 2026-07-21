import { LikeIcon, DislikeIcon } from '../Icons'
import s from './ButtonReaction.module.css'
import type { CurrentUserReaction } from '@/common/types/types'

type PropsButton = {
  variant: 'like' | 'dislike'
  elemId: string
  handleReaction: (elemId: string) => void
  removeReaction: (elemId: string) => void
  userReaction: CurrentUserReaction
  likesCount?: number
}

export const ButtonReaction = ({
  variant,
  elemId,
  handleReaction,
  removeReaction,
  userReaction,
  likesCount,
}: PropsButton) => {
  const isActive =
    (variant === 'like' && userReaction === 1) ||
    (variant === 'dislike' && userReaction === -1)

  const handleClick = () => {
    if (isActive) {
      removeReaction(elemId)
    } else {
      handleReaction(elemId)
    }
  }

  return (
    <button onClick={handleClick} className={isActive ? s.active : ''}>
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
