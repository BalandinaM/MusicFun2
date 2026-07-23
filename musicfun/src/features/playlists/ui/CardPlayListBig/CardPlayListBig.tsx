import type { PlaylistData } from '@/features/playlists/api'
import s from './CardPlayListBig.module.css'
import { useReactions } from '@/common/hooks'
import { ButtonsBlock, Chip, HorizontalScroll } from '@/common/components'
import { getPlaylistCover } from '@/common/utils'

type Props = {
  playlist: PlaylistData
}

export const CardPlaylistBig = ({ playlist }: Props) => {
  const { handleLike, handleDislike, handleRemove } = useReactions('playlist')
  const data = playlist.attributes
  const src = getPlaylistCover(data.images, 'original')

  return (
    <li className={s.card}>
      <img src={src} alt={data.title} width={288} height={288} />
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
