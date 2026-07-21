import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardTrack.module.css'
import { ButtonReaction } from '../ButtonReaction/ButtonReaction'
import type {
  TrackData,
  TrackRelationships,
  TracksIncluded,
} from '@/features/tracks/api'

type Props = {
  track: TrackData
  included?: TracksIncluded[]
}

export const CardTrack = ({ track, included }: Props) => {
  // const [postLikeReaction] = useLikePlaylistMutation()
  // const [postDislikeReaction] = useDislikePlaylistMutation()
  const dataAtr = track.attributes
  const dataRelationships = track.relationships
  const thumbnailCover = dataAtr.images.main.find(
    img => img.type === 'thumbnail'
  )
  const src = thumbnailCover ? thumbnailCover?.url : defaultCover

  const getArtistsNames = (
    relationships: TrackRelationships,
    included: TracksIncluded[]
  ): string => {
    const artistIds = relationships.artists.data.map(item => item.id) || []
    const artists = included.filter(item => artistIds.includes(item.id)) || []
    const names = artists.map(artist => artist.attributes.name).filter(Boolean)
    return names.join(', ')
  }

  const nameArtist =
    dataRelationships.artists.data.length && included?.length
      ? getArtistsNames(dataRelationships, included)
      : 'Unknown Artist'

  const handleLikeReaction = (trackId: string) => {
    // postLikeReaction({ trackId })
    console.log(trackId)
  }

  const handleDisLikeReaction = (trackId: string) => {
    // postDislikeReaction({ trackId })
    console.log(trackId)
  }

  return (
    <div className={s.card}>
      <img src={src} alt="Cover" width={'174px'} className={s.cover} />
      <h4 className="text-body-md text-truncate">{dataAtr.title}</h4>
      <p className="text-truncate">{nameArtist}</p>
      <div className={s.wrapButton}>
        <ButtonReaction
          variant="like"
          playlistId={track.id}
          callback={handleLikeReaction}
          userReaction={dataAtr.currentUserReaction}
          likesCount={dataAtr.likesCount}
        />
        <ButtonReaction
          variant="dislike"
          playlistId={track.id}
          callback={handleDisLikeReaction}
          userReaction={dataAtr.currentUserReaction}
        />
      </div>
    </div>
  )
}
