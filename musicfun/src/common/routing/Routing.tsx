import { MainPage } from '@/app/ui'
import { ProfilePage } from '@/features/auth/iu'
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
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.Tracks} element={<TracksPage />} />
    <Route path={Path.Profile} element={<ProfilePage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
