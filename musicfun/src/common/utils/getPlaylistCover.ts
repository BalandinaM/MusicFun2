import defaultCover from '@/assets/images/defaultCover.png'

export const getPlaylistCover = (
  images: { main: { type: string; url: string }[] },
  size: 'thumbnail' | 'medium' | 'original' = 'medium'
): string => {
  const image = images.main.find(img => img.type === size)
  return image?.url || defaultCover
}
