import type { PlaylistData } from '@/features/playlists/api'
import defaultCover from '@/assets/images/defaultCover.png'
import s from './CardPlaylist.module.css'
import { getDaysAgoText } from '@/common/utils'
import { DislikeIcon, LikeIcon } from '../Icons'

type Props = {
  playlist: PlaylistData
}

export const CardPlalist = ({ playlist }: Props) => {
  const thumbnailCover = playlist.attributes.images.main.find(
    img => img.type === 'thumbnail'
  )
  const src = thumbnailCover ? thumbnailCover?.url : defaultCover
  console.log(playlist.attributes.currentUserReaction)
  //   console.log(playlist.)

  return (
    <div>
      <img src={src} alt="Cover" width={'174px'} className={s.cover} />
      <h4>{playlist.attributes.title}</h4>
      <p>
        <span>Made for </span>
        {playlist.attributes.user.name}
      </p>
      <p>
        {playlist.attributes.tracksCount} Tracks • Created{' '}
        {getDaysAgoText(playlist.attributes.addedAt)}
      </p>
      {/* Этот  блок надо вынести в отдельный компонент, ну или нет, подумать, 
      тут должны быть кнопки, надо замутить обработчик клика, и дебаунс обязательно, вдруг
      юзер передумает лайкать
      плюсоми передать состояние, лайкнут плайлист или нет,
      вообще логичней вынести его, так как этот же блок я буду использовать в треках
      */}
      <div>
        <div>
          <LikeIcon />
          <span>{playlist.attributes.likesCount}</span>
        </div>
        <DislikeIcon />
      </div>
    </div>
  )
}
