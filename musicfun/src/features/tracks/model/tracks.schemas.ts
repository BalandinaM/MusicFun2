import {
  imagesSchema,
  currentUserReactionSchema,
  userSchema,
} from '@/common/schemas'
import * as z from 'zod'

export const trackAttachmentSchema = z.object({
  id: z.string(),
  addedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  version: z.number().int().nonnegative(),
  url: z.string().url(),
  contentType: z.string(),
  originalName: z.string(),
  fileSize: z.number().int().nonnegative(),
})

export const trackAttributesSchema = z.object({
  title: z.string(),
  addedAt: z.iso.datetime(),
  attachments: z.array(trackAttachmentSchema),
  images: imagesSchema,
  currentUserReaction: currentUserReactionSchema,
  user: userSchema,
  isPublished: z.boolean(),
  publishedAt: z.iso.datetime(),
})

export const trackRelationshipsSchema = z.object({
  artists: z.object({
    data: z.object({
      id: z.string(),
      type: z.literal('artists'),
    }),
  }),
})

export const trackDataSchema = z.object({
  id: z.string(),
  type: z.literal('tracks'),
  attributes: trackAttributesSchema,
  relationships: trackRelationshipsSchema,
})

export const tracksIncludedSchema = z.object({
  id: z.string(),
  type: z.literal('artists'),
  attributes: z.object({
    name: z.string(),
  }),
})

export const tracksMetaSchema = z.object({
  nextCursor: z.string().nullable(),
  page: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  totalCount: z.number().int().nonnegative().nullable(),
  pagesCount: z.number().int().nonnegative().nullable(),
})

export const fetchTracksResponseSchema = z.object({
  data: z.array(trackDataSchema),
  included: z.array(tracksIncludedSchema),
  meta: tracksMetaSchema,
})
