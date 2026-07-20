import type {
  createPlaylistSchema,
  playlistAttributesSchema,
  playlistDataSchema,
  playlistMetaSchema,
  playlistsResponseSchema,
  reactionPlaylistRequestSchema,
  reactionPlaylistResponseSchema,
} from '../model'
import * as z from 'zod'
import type {} from '../model/playlists.schemas'

export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
}

export type UpdatePlaylistArgs = {
  title: string
  description: string
  tagIds: string[]
}

export type PlaylistMeta = z.infer<typeof playlistMetaSchema>
export type CreatePlaylistArgs = z.infer<typeof createPlaylistSchema>
export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>
export type PlaylistData = z.infer<typeof playlistDataSchema>
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>
export type ReactionPlaylistRequest = z.infer<
  typeof reactionPlaylistRequestSchema
>
export type ReactionPlaylistResponse = z.infer<
  typeof reactionPlaylistResponseSchema
>
