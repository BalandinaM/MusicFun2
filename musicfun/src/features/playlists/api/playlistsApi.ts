import type { Images } from '@/common/types'
import {
  type PlaylistsResponse,
  type CreatePlaylistArgs,
  type PlaylistData,
  type UpdatePlaylistArgs,
} from './playlistsApi.types'
import { baseApi } from '@/app/api/baseApi'

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => {
        return {
          method: 'get',
          url: `playlists`,
        }
      },
      providesTags: ['Playlist'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: body => {
        return {
          method: 'post',
          url: `playlists`,
          body: {
            data: {
              type: 'playlists',
              attributes: body,
            },
          },
        }
      },
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: playlistId => ({
        url: `playlists/${playlistId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylist: build.mutation<
      void,
      { playlistId: string; body: UpdatePlaylistArgs }
    >({
      query: ({ playlistId, body }) => ({
        url: `playlists/${playlistId}`,
        method: 'put',
        body: {
          data: {
            type: 'playlists',
            attributes: {
              title: body.title,
              description: body.description,
              tagIds: body.tagIds,
            },
          },
        },
      }),
      invalidatesTags: ['Playlist'],
    }),
    uploadPlaylistCover: build.mutation<
      Images,
      { playlistId: string; file: File }
    >({
      query: ({ playlistId, file }) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'post',
          body: formData,
        }
      },
      invalidatesTags: ['Playlist'],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
} = playlistsApi
