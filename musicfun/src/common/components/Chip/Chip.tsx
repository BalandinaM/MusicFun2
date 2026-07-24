import { CloseIcon } from '@/common/components/Icons'
import s from './Chip.module.css'

type ChipProps = {
  label: string
  className?: string
  onClick?: () => void
  onRemove?: () => void
  isAuth?: boolean
  removable?: boolean
}

export const Chip = ({
  label,
  className,
  onClick,
  onRemove,
  isAuth = false,
  removable = false,
}: ChipProps) => {
  return (
    <div className={`${s.wrap} ${className || ''}`}>
      <span className="text-menu-chip" onClick={onClick}>
        {isAuth ? `#${label}` : label}
      </span>

      {removable && (
        <button
          type="button"
          className={s.removeBtn}
          onClick={e => {
            e.stopPropagation()
            onRemove?.()
          }}
          aria-label={`Remove ${label}`}
        >
          <CloseIcon className={s.closeIcon} />
        </button>
      )}
    </div>
  )
}
