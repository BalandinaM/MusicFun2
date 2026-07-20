import type { PlaylistData } from '@/features/playlists/api'
import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardPlaylist.module.css'
import { getDaysAgoText } from '@/common/utils'
import { DislikeIcon, LikeIcon } from '../Icons'
import { Reactions } from '../Reactions/Reactions'

type Props = {
  playlist: PlaylistData
}

export const CardPlalist = ({ playlist }: Props) => {
  const data = playlist.attributes
  const thumbnailCover = data.images.main.find(img => img.type === 'thumbnail')
  const src = thumbnailCover ? thumbnailCover?.url : defaultCover

  return (
    <div>
      <img src={src} alt="Cover" width={'174px'} className={s.cover} />
      <h4>{data.title}</h4>
      <p>
        <span>Made for </span>
        {data.user.name}
      </p>
      <p>
        {data.tracksCount} Tracks • Created {getDaysAgoText(data.addedAt)}
      </p>
      {/* Этот  блок надо вынести в отдельный компонент, ну или нет, подумать, 
      тут должны быть кнопки, надо замутить обработчик клика, и дебаунс обязательно, вдруг
      юзер передумает лайкать
      плюсоми передать состояние, лайкнут плайлист или нет,
      вообще логичней вынести его, так как этот же блок я буду использовать в треках
      */}
      <Reactions data={data} playlistId={playlist.id} />
    </div>
  )
}
