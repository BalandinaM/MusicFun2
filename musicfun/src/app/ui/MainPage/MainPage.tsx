import {
  AllPlaylistsIcon,
  DislikeIcon,
  HomeIcon,
  LikeIcon,
  TracksIcon,
  LibraryIcon,
} from '@/common/components/Icons'
import { HeaderMainPage } from './HeaderMainPage'

export const MainPage = () => {
  return (
    <div>
      <HeaderMainPage />
      <AllPlaylistsIcon></AllPlaylistsIcon>
      <DislikeIcon></DislikeIcon>
      <HomeIcon></HomeIcon>
      <LibraryIcon />
      <LikeIcon />
      <TracksIcon />
    </div>
  )
}
