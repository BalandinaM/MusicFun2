import { Path } from '@/common/routing'
import { NavLink } from 'react-router'
import s from './NavMenu.module.css'

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.Playlists, label: 'Playlists' },
  { to: Path.Tracks, label: 'Tracks' },
]

export const NavMenu = () => {
  return (
    <nav>
      <ul className={s.list}>
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `link ${isActive ? s.activeLink : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
