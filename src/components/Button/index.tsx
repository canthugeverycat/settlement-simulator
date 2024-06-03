type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
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
  children,
  onClick,
}: ButtonProps) => {
  const baseClass =
    'border-2 font-bold uppercase transition-all duration-200 hover:scale-95 active:scale-100';

  const sizeClass = {
    small: 'px-6 py-3 text-sm shadow-sm',
    medium: 'px-10 py-5 text-lg shadow-md',
    large: 'py-8 px-16 text-xl shadow-lg',
  }[size];

  const colorClass = {
    primary:
      'border-primary text-primary hover:border-white hover:bg-primary hover:text-white',
    secondary:
      'border-secondary text-secondary hover:border-white hover:bg-secondary hover:text-white',
  }[color];

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${sizeClass} ${colorClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
