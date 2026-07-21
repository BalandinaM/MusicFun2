import {
  currentUserReactionSchema,
  imagesSchema,
  userSchema,
} from '@/common/schemas'
import * as z from 'zod'

export const trackAttachmentSchema = z.object({
  id: z.string(),
  addedAt: z.string().datetime({ offset: true }), // или z.iso.datetime() если у вас кастомный
  updatedAt: z.string().datetime({ offset: true }),
  version: z.number().int().nonnegative(),
  url: z.string().url(),
  contentType: z.string(),
  originalName: z.string(),
  fileSize: z.number().int().nonnegative(),
})

export const trackAttributesSchema = z.object({
  title: z.string(),
  user: userSchema, // Убедитесь, что userSchema соответствует { id, name }
  addedAt: z.string().datetime({ offset: true }),
  attachments: z.array(trackAttachmentSchema),
  images: imagesSchema, // Убедитесь, что imagesSchema соответствует структуре
  currentUserReaction: currentUserReactionSchema, // 0, 1, 2
  publishedAt: z.string().datetime({ offset: true }),
  likesCount: z.number().int().nonnegative(), // 👈 Новое поле!
  isPublished: z.boolean(),
  duration: z.number().int().nonnegative(), // 👈 Новое поле!
})

// relationships теперь может быть с пустым массивом
export const trackRelationshipsSchema = z.object({
  artists: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        type: z.literal('artists'),
      })
    ), // 👈 Теперь это массив, а не объект
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
