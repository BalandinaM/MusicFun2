import { ButtonReaction } from '../ButtonReaction/ButtonReaction'
import type { CurrentUserReaction } from '@/common/types/types'
import { ButtonMenu } from '../ButtonMenu/ButtonMenu'
import s from './ButtonsBlock.module.css'

type Props = {
  elemId: string
  handleLike: (elemId: string) => void
  handleDislike: (elemId: string) => void
  removeReaction: (elemId: string) => void
  userReaction: CurrentUserReaction
  likesCount?: number
}

export const ButtonsBlock = ({
  elemId,
  handleLike,
  handleDislike,
  removeReaction,
  userReaction,
  likesCount,
}: Props) => {
  return (
    <div className={s.wrapButton}>
      <ButtonReaction
        variant="like"
        elemId={elemId}
        handleReaction={handleLike}
        removeReaction={removeReaction}
        userReaction={userReaction}
        likesCount={likesCount}
      />
      <ButtonReaction
        variant="dislike"
        elemId={elemId}
        handleReaction={handleDislike}
        removeReaction={removeReaction}
        userReaction={userReaction}
      />
      <ButtonMenu />
    </div>
  )
}
