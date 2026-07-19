import { Chip } from '@/common/components'
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
      <div className={s.wrapTags}>
        {tags.map(tag => (
          <Chip label={tag} key={tag} isAuth={isAuth} />
        ))}
      </div>
    </div>
  )
}
