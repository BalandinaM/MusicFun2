import { CardTrack, Chip, HorizontalScroll } from '@/common/components'
import { HeaderMainPage } from './HeaderMainPage'
import s from './MainPage.module.css'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useFetchTracksListQuery } from '@/features/tracks/api/tracksApi'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { CardPlaylist } from '@/features/playlists/ui'

const tags = ['Playlists', 'Artists', 'Albums', 'Podcast', 'Podcasts & shows']

export const MainPage = () => {
  const { data } = useGetMeQuery()

  const { data: newTracks, isLoading: isLoadingTracks } =
    useFetchTracksListQuery({})
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useFetchPlaylistsQuery({})

  const included = newTracks?.included
  const isAuth = !!data

  if (isLoadingTracks || isLoadingPlaylists) return <div>Loading...</div>

  return (
    <div className={s.wrapMainPage}>
      <HeaderMainPage data={data} />
      <HorizontalScroll gap={8} padding="12px 0">
        {tags.map(tag => (
          <Chip label={tag} key={tag} isAuth={isAuth} />
        ))}
      </HorizontalScroll>
      <h2>New playlists</h2>
      <HorizontalScroll>
        {playlists?.data.map(playlist => (
          <CardPlaylist key={playlist.id} playlist={playlist} />
        ))}
      </HorizontalScroll>
      <h2>New Tracks</h2>
      <HorizontalScroll gap={8} padding="12px 0">
        {newTracks?.data.map(track => (
          <CardTrack track={track} included={included} />
        ))}
      </HorizontalScroll>
    </div>
  )
}
