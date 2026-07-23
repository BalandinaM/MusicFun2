import type { PlaylistData } from '@/features/playlists/api'
import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardPlaylist.module.css'
import { getDaysAgoText, getPlaylistCover } from '@/common/utils'
import { ButtonReaction } from '../../../../../common/components/ButtonReaction/ButtonReaction'
import { useReactions } from '@/common/hooks'
import type { OptionCard } from '@/features/playlists/ui/PlaylistsContainer/PlaylistsContainer'
import { ButtonMenu, ButtonsBlock } from '@/common/components'
import { PlaylistCover } from './PlaylistCover/PlaylistCover'

type Props = {
  playlist: PlaylistData
  optionCard: OptionCard
}

export const CardPlaylist = ({ playlist, optionCard }: Props) => {
  const { handleLike, handleDislike, handleRemove } = useReactions('playlist')
  const data = playlist.attributes
  // const thumbnailCover = data.images.main.find(img => img.type === 'thumbnail')
  // const src = thumbnailCover ? thumbnailCover?.url : defaultCover

  // const coverSize = optionCard === 'big' ? 'original' : 'medium'
  // const src = getPlaylistCover(data.images, coverSize)

  return (
    <li className={s.card}>
      {/* <img src={src} alt="Cover" width={'174px'} className={s.cover} /> */}
      <PlaylistCover
        images={data.images}
        alt={'title playlist'}
        optionCard={optionCard}
      />
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
