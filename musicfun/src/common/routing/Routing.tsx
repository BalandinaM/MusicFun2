import { MainPage } from '@/app/ui'
import { OAuthCallback, ProfilePage } from '@/features/auth/iu'
import { PlaylistsPage } from '@/features/playlists/ui'
import { TracksPage } from '@/features/tracks/ui'
import { Routes, Route } from 'react-router'
import { PageNotFound } from '../components'

export const Path = {
  //это предупреждение, вите советует убрать объявления контстант в другое место, а тут оставить только код компонента
  Main: '/',
  Playlists: '/playlists',
  Tracks: '/tracks',
  Profile: '/profile',
  OAuthRedirect: '/oauth/callback',
  NotFound: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage />} />
      <Route path={Path.Playlists} element={<PlaylistsPage />} />
      <Route path={Path.Tracks} element={<TracksPage />} />
      <Route path={Path.Profile} element={<ProfilePage />} />
      <Route path={Path.OAuthRedirect} element={<OAuthCallback />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
