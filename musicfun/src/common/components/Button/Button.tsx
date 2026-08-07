import s from './Button.module.css'

type Props = {
  title: string
  onClick: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'pink' | 'grey'
}

export const Button = ({
  title,
  onClick,
  className = '',
  type = 'button',
  variant = 'grey',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${s.button} ${s[variant]} ${className} text-button-login`}
    >
      {title}
    </button>
  )
}
