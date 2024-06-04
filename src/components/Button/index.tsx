type ButtonProps = {
  size?: 'small' | 'medium' | 'large' | 'full';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

/**
 * A button component with theming
 * @param {ButtonProps} props
 */
const Button = ({
  size = 'medium',
  color = 'primary',
  disabled = false,
  className = '',
  children,
  onClick,
}: ButtonProps) => {
  const baseClass =
    'font-bold uppercase transition-all duration-200 hover:bg-gradient-to-l opacity-1 hover:opacity-90 hover:scale-105 active:scale-100';

  const sizeClass = {
    small: 'px-4 py-2 text-xs shadow-sm',
    medium: 'px-6 py-3 text-sm shadow-sm',
    large: 'px-10 py-4 text-lg shadow-md',
    full: 'px-10 py-5 text-lg shadow-md w-full',
  }[size];

  const colorClass = {
    primary: 'text-white bg-gradient-to-r from-primary to-blue-400',
    secondary: 'text-white bg-gradient-to-r from-secondary to-purple-400',
    success: 'text-white bg-gradient-to-r from-success to-primary',
    error: 'text-white bg-gradient-to-r from-error to-red-800',
  }[color];

  const disabledClass = disabled
    ? 'bg-gradient-to-r from-black to-light-grey hover:scale-100 hover:bg-gradient-to-r opacity-20 hover:opacity-20'
    : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${baseClass} ${sizeClass} ${colorClass} ${disabledClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
