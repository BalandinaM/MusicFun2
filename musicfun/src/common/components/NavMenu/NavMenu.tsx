import { Path } from '@/common/routing'
import { NavLink } from 'react-router'
import s from './NavMenu.module.css'
import { AllPlaylistsIcon, HomeIcon, LibraryIcon, TracksIcon } from '../Icons'

const iconMap = {
  [Path.Main]: HomeIcon,
  [Path.Playlists]: AllPlaylistsIcon,
  [Path.Tracks]: TracksIcon,
  [Path.Profile]: LibraryIcon,
}

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.Playlists, label: 'All Playlists' },
  { to: Path.Tracks, label: 'All Tracks' },
  { to: Path.Profile, label: 'Your Library' },
]

export const NavMenu = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        {navItems.map(({ to, label }) => {
          const Icon = iconMap[to]

          return (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.activeLink : ''}`
                }
              >
                <div className={s.iconWrap}>
                  <Icon className={s.icon} />
                </div>
                <span className={s.label}>{label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
