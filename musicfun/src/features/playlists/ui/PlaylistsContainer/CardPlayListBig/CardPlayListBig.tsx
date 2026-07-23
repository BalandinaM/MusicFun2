import type { PlaylistData } from '@/features/playlists/api'
import s from './CardPlayListBig.module.css'
import { useReactions } from '@/common/hooks'
import type { OptionCard } from '@/features/playlists/ui/PlaylistsContainer/PlaylistsContainer'
import { ButtonsBlock, Chip, HorizontalScroll } from '@/common/components'
import { PlaylistCover } from '../CardPlaylist/PlaylistCover/PlaylistCover'

type Props = {
  playlist: PlaylistData
  optionCard: OptionCard
}

export const CardPlaylistBig = ({ playlist, optionCard }: Props) => {
  const { handleLike, handleDislike, handleRemove } = useReactions('playlist')
  const data = playlist.attributes

  return (
    <li className={s.card}>
      <PlaylistCover
        images={data.images}
        alt={'title playlist'}
        optionCard={optionCard}
      />
      <h4 className="text-heading-playlist text-truncate">{data.title}</h4>
      <HorizontalScroll gap={8} padding="12px 0">
        {data.tags.map(tag => (
          <Chip label={tag.name} key={tag.id} />
        ))}
      </HorizontalScroll>
      <p className="text-meta-light text-truncate">{data.description}</p>
      <p>
        Отрисовка в карточке плейлиста будут данные с треками их кинуть сюда
      </p>
      <p className="text-meta text-truncate">
        Made for
        <span className="text-meta-underline"> {data.user.name}</span>•{' '}
        <span className="text-meta text-truncate">
          {data.tracksCount} Tracks, Продолжительность
        </span>
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
