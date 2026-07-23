import s from './Chip.module.css'

type ChipProps = {
  label: string
  className?: string
  onClick?: () => void
  isAuth?: boolean
}

export const Chip = ({ label, className, onClick, isAuth }: ChipProps) => {
  return (
    <div className={s.wrap}>
      <span className={`text-menu-chip ${className || ''}`} onClick={onClick}>
        {isAuth ? `#${label}` : `${label}`}
      </span>
    </div>
  )
}
