// import s from './Chip.module.css'

// type ChipProps = {
//   label: string
//   className?: string
//   onClick?: () => void
//   isAuth?: boolean
// }

// export const Chip = ({ label, className, onClick, isAuth }: ChipProps) => {
//   return (
//     <div className={s.wrap}>
//       <span className={`text-menu-chip ${className || ''}`} onClick={onClick}>
//         {isAuth ? `#${label}` : `${label}`}
//       </span>
//     </div>
//   )
// }

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
      <span className={s.label} onClick={onClick}>
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
