import {
  useLikePlaylistMutation,
  useDislikePlaylistMutation,
  useRemoveReactionPlaylistMutation,
} from '@/features/playlists/api/playlistsApi'
import {
  useDislikeTrackMutation,
  useLikeTrackMutation,
  useRemoveReactionTrackMutation,
} from '@/features/tracks/api/tracksApi'

type ReactionType = 'track' | 'playlist'

export const useReactions = (type: ReactionType) => {
  const likeHooks = {
    track: useLikeTrackMutation,
    playlist: useLikePlaylistMutation,
  }
  const dislikeHooks = {
    track: useDislikeTrackMutation,
    playlist: useDislikePlaylistMutation,
  }
  const removeHooks = {
    track: useRemoveReactionTrackMutation,
    playlist: useRemoveReactionPlaylistMutation,
  }

  const [postLike] = likeHooks[type]()
  const [postDislike] = dislikeHooks[type]()
  const [remove] = removeHooks[type]()

  const handleLike = (id: string) =>
    postLike({
      [type === 'track' ? 'trackId' : 'playlistId']: id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

  const handleDislike = (id: string) =>
    postDislike({
      [type === 'track' ? 'trackId' : 'playlistId']: id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

  const handleRemove = (id: string) =>
    remove({
      [type === 'track' ? 'trackId' : 'playlistId']: id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

  return { handleLike, handleDislike, handleRemove }
}
