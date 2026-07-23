import { getPlaylistCover } from '@/common/utils'
import type { OptionCard } from '../../PlaylistsContainer'
import s from './PlaylistCover.module.css'

type CoverSize = 'thumbnail' | 'medium' | 'original'

type Props = {
  images: { main: { type: string; url: string }[] }
  optionCard: OptionCard
  alt?: string
  className?: string
}

// 👇 Маппинг: тип карточки → размер картинки из API
const coverSizeMap: Record<OptionCard, CoverSize> = {
  big: 'original',
  medium: 'medium',
  small: 'thumbnail',
  'small-with-reaction': 'thumbnail',
}

// 👇 Маппинг: размер картинки → размеры в вёрстке
const SIZE_MAP: Record<CoverSize, { width: number; height: number }> = {
  thumbnail: { width: 60, height: 60 },
  medium: { width: 174, height: 153 },
  original: { width: 288, height: 289 },
}

export const PlaylistCover = ({
  images,
  optionCard,
  alt = 'Cover',
  className,
}: Props) => {
  // 👇 По optionCard определяем, какой размер из API брать
  const size = coverSizeMap[optionCard]

  // 👇 Получаем URL картинки
  const src = getPlaylistCover(images, size)

  // 👇 Берём размеры для вёрстки из SIZE_MAP
  const { width, height } = SIZE_MAP[size]

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={s.cover}
    />
  )
}
