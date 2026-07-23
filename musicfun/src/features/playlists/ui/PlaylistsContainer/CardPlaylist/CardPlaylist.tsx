import type { PlaylistData } from '@/features/playlists/api'
import s from './CardPlaylist.module.css'
import { getDaysAgoText, getPlaylistCover } from '@/common/utils'
import { useReactions } from '@/common/hooks'
import type { OptionCard } from '@/features/playlists/ui/PlaylistsContainer/PlaylistsContainer'
import { ButtonsBlock } from '@/common/components'

type Props = {
  playlist: PlaylistData
  optionCard: OptionCard
}

export const CardPlaylist = ({ playlist }: Props) => {
  const { handleLike, handleDislike, handleRemove } = useReactions('playlist')
  const data = playlist.attributes
  const src = getPlaylistCover(data.images, 'medium')

  return (
    <li className={s.card}>
      <img src={src} alt={data.title} width={174} height={153} />
      <h4 className="text-body-md text-truncate">{data.title}</h4>
      <p className="text-meta text-truncate">
        Made for
        <span className="text-meta-underline"> {data.user.name}</span>
      </p>
      <p className="text-meta text-truncate">
        {data.tracksCount} Tracks • Created {getDaysAgoText(data.addedAt)}
      </p>
      <ButtonsBlock
        elemId={playlist.id}
        handleLike={handleLike}
        handleDislike={handleDislike}
        removeReaction={handleRemove}
        userReaction={data.currentUserReaction}
        likesCount={data.likesCount}
      />
    </li>
  )
}
