//майн пейдж в горизонтальном скролле просто карточки плейлистов
//страница всех плейлистов:
// строка поиска
//фильтрация по тегам
//строка сортировки
//список плейлистов(при этом получается плейлист это сслыка, при клике - переход в плейлист, он всегда сслыка так то)
//пагинация(может инфинити скролл лучше седлать)
//страница плейлиста
//тут как будто две сущности переплетаются, инфо о плейлисте с список треков
//опять пошла мысль категориями страниц, не правильно!!!
//Это СТРАНИЦА!!!! Твоя задача в работе с плейлистами выдать кирпичик для отрисовки информации о плейлисте
//По сути это таже карточка плейлиста но отрисована по другому, есть пара дополнительных полей.
//профиль пользователя
//тот же список плелистов
//карточка отрисована чуть по другому
//есть вкладка понравившиеся плейлисты, отображение почти такое же, эндпоинт другой
//страница др пользователя
//тот же список плейлистов как в лайкед плейлист
//модалка для создания плелиста
//модалка для редактирования плейлиста
//модалка для выбора плейлистав который положить загруженый трек

import { HorizontalScroll } from '@/common/components'
import { useFetchPlaylistsQuery } from '../../api/playlistsApi'
import { CardPlaylist } from './CardPlaylist/CardPlaylist'

type OptionList = 'scroll' | 'grid'
export type OptionCard = 'big' | 'medium' | 'small' | 'small-with-reaction'

type Props = {
  optionList: OptionList
  optionCard: OptionCard
}

export const PlaylistsContainer = ({ optionList, optionCard }: Props) => {
  const { data: playlists, isLoading } = useFetchPlaylistsQuery({})

  if (isLoading) return <div>Loading...</div>
  if (!playlists?.data.length) return <div>No playlists found</div>

  const cards = playlists.data.map(playlist => (
    <CardPlaylist
      key={playlist.id}
      playlist={playlist}
      optionCard={optionCard}
      //   onEdit={onEdit}
      //   onDelete={onDelete}
    />
  ))

  if (optionList === 'scroll') {
    return (
      <HorizontalScroll gap={8} padding="12px 0">
        {cards}
      </HorizontalScroll>
    )
  }

  return <ul>{cards}</ul>
}
