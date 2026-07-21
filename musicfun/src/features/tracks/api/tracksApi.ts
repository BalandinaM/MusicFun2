import { baseApi } from '@/app/api/baseApi'
import type {
  FetchTracksArgs,
  FetchTracksResponse,
  reactionTrackRequest,
} from './tracksApi.types'
import { withZodCatch } from '@/common/utils'
import {
  fetchTracksResponseSchema,
  reactionTrackResponseSchema,
} from '../model'

export const tracksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchTracks: build.infiniteQuery<
      FetchTracksResponse,
      void,
      string | undefined
    >({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: lastPage => {
          return lastPage.meta.nextCursor || undefined
        },
      },
      query: ({ pageParam }) => {
        return {
          url: 'playlists/tracks',
          params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
        }
      },
      ...withZodCatch(fetchTracksResponseSchema),
    }),
    fetchTracksList: build.query({
      query: (params: FetchTracksArgs) => {
        return {
          method: 'get',
          url: 'playlists/tracks',
          params,
        }
      },
      ...withZodCatch(fetchTracksResponseSchema),
      providesTags: ['Track'],
    }),
    likeTrack: build.mutation({
      query: ({ trackId }: reactionTrackRequest) => ({
        method: 'post',
        url: `/playlists/tracks/${trackId}/likes`,
      }),
      ...withZodCatch(reactionTrackResponseSchema),
      invalidatesTags: ['Track'],
    }),
    dislikeTrack: build.mutation({
      query: ({ trackId }: reactionTrackRequest) => ({
        method: 'post',
        url: `/playlists/tracks/${trackId}/dislikes`,
      }),
      ...withZodCatch(reactionTrackResponseSchema),
      invalidatesTags: ['Track'],
    }),
    removeReactionTrack: build.mutation({
      query: ({ trackId }: reactionTrackRequest) => ({
        method: 'delete',
        url: `/playlists/tracks/${trackId}/reactions`,
      }),
      ...withZodCatch(reactionTrackResponseSchema),
      invalidatesTags: ['Track'],
    }),

    //////paginationType: 'offset'////////

    // fetchTracks: build.infiniteQuery<FetchTracksResponse, void, number>({
    //   infiniteQueryOptions: {
    //     initialPageParam: 1,
    //     getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    //       return lastPageParam <
    //         (lastPage.meta as { pagesCount: number }).pagesCount
    //         ? lastPageParam + 1
    //         : undefined
    //     },
    //   },
    //   query: ({ pageParam }) => {
    //     return {
    //       url: 'playlists/tracks',
    //       params: {
    //         pageNumber: pageParam,
    //         pageSize: 10,
    //         paginationType: 'offset',
    //       },
    //     }
    //   },
    // }),
  }),
})
export const {
  useFetchTracksInfiniteQuery,
  useFetchTracksListQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
  useRemoveReactionTrackMutation,
} = tracksApi
