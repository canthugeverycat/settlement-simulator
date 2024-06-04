import Loader from '../Loader';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large' | 'full';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  disabled?: boolean;
  showLoader?: boolean;
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
  showLoader = false,
  className = '',
  children,
  onClick,
}: ButtonProps) => {
  const baseClass =
    'relative font-bold uppercase transition-all duration-200 opacity-1 active:scale-100';

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
    ? 'bg-gradient-to-r from-black to-light-grey opacity-20'
    : 'hover:opacity-90 hover:scale-105 hover:bg-gradient-to-l';

  return (
    <button
      onClick={onClick}
      disabled={disabled || showLoader}
      className={`${className} ${baseClass} ${sizeClass} ${colorClass} ${disabledClass}`}
    >
      {children}

      {showLoader && (
        <Loader
          color="white"
          className="absolute left-1/2 top-1/2 -ml-4 -mt-4"
        />
      )}
    </button>
  );
};

export default Button;
