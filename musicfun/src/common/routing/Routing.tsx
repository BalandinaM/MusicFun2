import { OAuthCallback } from '@/features/auth/ui'
import { TracksPage } from '@/features/tracks/ui'
import { Routes, Route } from 'react-router'
import { PageNotFound, ProtectedRoute } from '../components'
import { MainPage, PlaylistsPage } from '@/pages'
import { ProfilePage } from '@/pages/ProfilePage'
// import { AuthorizationPage } from '@/features/auth/ui/AuthorizationModal'
import { useAppSelector } from '../hooks'
import { selectIsLoggedIn } from '@/features/auth/model/authSlice'

export const Path = {
  //это предупреждение, вите советует убрать объявления контстант в другое место, а тут оставить только код компонента
  Main: '/',
  // Login: '/login',
  Playlists: '/playlists',
  Tracks: '/tracks',
  Profile: '/profile',
  OAuthRedirect: '/oauth/callback',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage />} />
      <Route path={Path.Playlists} element={<PlaylistsPage />} />
      <Route path={Path.Tracks} element={<TracksPage />} />
      {/* <Route
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />
        }
      > */}
      <Route path={Path.Profile} element={<ProfilePage />} />
      {/* </Route> */}
      <Route path={Path.OAuthRedirect} element={<OAuthCallback />} />
      {/* <Route
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />
        }
      >
        <Route path={Path.Login} element={<AuthorizationPage />} />
      </Route> */}
      {/* <Route path={Path.Login} element={<AuthorizationPage />} /> */}
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
