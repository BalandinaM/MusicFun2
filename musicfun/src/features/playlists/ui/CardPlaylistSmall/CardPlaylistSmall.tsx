import type { PlaylistData } from '@/features/playlists/api'
import s from './CardPlaylistSmall.module.css'
import { useReactions } from '@/common/hooks'
import type { OptionCard } from '@/features/playlists/ui/PlaylistsContainer/PlaylistsContainer'
import { ButtonMenu, ButtonReaction, ButtonsBlock } from '@/common/components'
import { getPlaylistCover } from '@/common/utils'

type Props = {
  playlist: PlaylistData
  variant?: 'full' | 'no-likes' | 'no-buttons'
}

export const CardPlaylistSmall = ({ playlist, variant = 'full' }: Props) => {
  const { handleLike, handleDislike, handleRemove } = useReactions('playlist')
  const data = playlist.attributes
  const src = getPlaylistCover(data.images, 'thumbnail')

  return (
    <li className={s.card}>
      <img src={src} alt={data.title} width={60} height={60} />
      <div className={s.wrapText}>
        <h4 className="text-body-md text-truncate">{data.title}</h4>
        <p className="text-body-sm text-truncate">
          Playlist • {data.tracksCount} Tracks
        </p>
      </div>
      {variant !== 'no-buttons' && (
        <div className={s.wrapButton}>
          {variant !== 'no-likes' && (
            <>
              <ButtonReaction
                variant="like"
                elemId={playlist.id}
                handleReaction={handleLike}
                removeReaction={handleRemove}
                userReaction={data.currentUserReaction}
                likesCount={data.likesCount}
              />
              <ButtonReaction
                variant="dislike"
                elemId={playlist.id}
                handleReaction={handleDislike}
                removeReaction={handleRemove}
                userReaction={data.currentUserReaction}
              />
            </>
          )}

          <ButtonMenu />
        </div>
      )}
    </li>
  )
}
