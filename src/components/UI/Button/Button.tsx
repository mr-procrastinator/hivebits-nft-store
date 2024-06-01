import classNames from 'classnames'
import './styles.scss'

export enum ButtonVariant {
  Icon = 'app-button_icon',
  Primary = 'app-button_primary',
  Secondary = 'app-button_secondary',
  Outlined = 'app-button_outlined'
}

export interface ButtonProps extends React.PropsWithChildren {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: React.CSSProperties,
  variant?: ButtonVariant,
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  style,
  variant = ButtonVariant.Primary,
  disabled,
  children
}) => {
  return <button 
    className={classNames("app-button", variant, className)}
    style={style}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
}