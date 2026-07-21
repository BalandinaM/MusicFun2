import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardTrack.module.css'
import { ButtonReaction } from '../ButtonReaction/ButtonReaction'
import type {
  TrackData,
  TrackRelationships,
  TracksIncluded,
} from '@/features/tracks/api'
import {
  useDislikeTrackMutation,
  useLikeTrackMutation,
  useRemoveReactionTrackMutation,
} from '@/features/tracks/api/tracksApi'

type Props = {
  track: TrackData
  included?: TracksIncluded[]
}

export const CardTrack = ({ track, included }: Props) => {
  const [postLikeReaction] = useLikeTrackMutation()
  const [postDislikeReaction] = useDislikeTrackMutation()
  const [removeReaction] = useRemoveReactionTrackMutation()
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
    postLikeReaction({ trackId })
  }

  const handleDisLikeReaction = (trackId: string) => {
    postDislikeReaction({ trackId })
  }

  const handleRemoveReaction = (trackId: string) => {
    removeReaction({ trackId })
  }

  return (
    <div className={s.card}>
      <img src={src} alt="Cover" width={'174px'} className={s.cover} />
      <h4 className="text-body-md text-truncate">{dataAtr.title}</h4>
      <p className="text-truncate text-body-sm">{nameArtist}</p>
      <div className={s.wrapButton}>
        <ButtonReaction
          variant="like"
          elemId={track.id}
          handleReaction={handleLikeReaction}
          removeReaction={handleRemoveReaction}
          userReaction={dataAtr.currentUserReaction}
          likesCount={dataAtr.likesCount}
        />
        <ButtonReaction
          variant="dislike"
          elemId={track.id}
          handleReaction={handleDisLikeReaction}
          removeReaction={handleRemoveReaction}
          userReaction={dataAtr.currentUserReaction}
        />
      </div>
    </div>
  )
}
