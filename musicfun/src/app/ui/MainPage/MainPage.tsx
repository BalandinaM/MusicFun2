import { Chip, HorizontalScroll } from '@/common/components'
import { HeaderMainPage } from './HeaderMainPage'
import s from './MainPage.module.css'
import { useGetMeQuery } from '@/features/auth/api/authApi'

const tags = ['Playlists', 'Artists', 'Albums', 'Podcast', 'Podcasts & shows']

export const MainPage = () => {
  const { data } = useGetMeQuery()
  const isAuth = !!data
  return (
    <div className={s.wrapMainPage}>
      <HeaderMainPage data={data} />
      <HorizontalScroll gap={8} padding="12px 0">
        {tags.map(tag => (
          <Chip label={tag} key={tag} isAuth={isAuth} />
        ))}
      </HorizontalScroll>
    </div>
  )
}
