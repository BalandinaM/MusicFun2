import type { PlaylistData } from '@/features/playlists/api'
import { CardPlaylistSmall } from '../CardPlaylistSmall/CardPlaylistSmall'
import s from './PlaylistsList.module.css'
type Props = {
  playlists: PlaylistData[]
  variant?: 'full' | 'no-likes' | 'no-buttons'
}

export const PlaylistsList = ({ playlists, variant }: Props) => {
  return (
    <ul className={s.list}>
      {playlists.map(playlist => (
        <CardPlaylistSmall
          key={playlist.id}
          playlist={playlist}
          variant={variant}
        />
      ))}
    </ul>
  )
}
