import NetworkGif from '../../assets/network.webp';

type LogoProps = {
  size: 'extrasmall' | 'small' | 'medium' | 'large';
  className?: string;
};

/**
 * Animated logo component
 * @param {LogoProps} props
 */
const Logo = ({ size = 'medium', className = '' }: LogoProps) => {
  const sizeClasses = {
    extrasmall: 'h-[30px] w-[50px]',
    small: 'h-[50px] w-[85px]',
    medium: 'h-[70px] w-[120px]',
    large: 'h-[110px] w-[190px]',
  }[size];

  return (
    <a href="https://leylinepro.com/" target="_blank" rel="noreferrer">
      <img
        className={`${className} ${sizeClasses} mask-image-logo`}
        src={NetworkGif}
        alt="LeyLine Logo"
      />
    </a>
  );
};

export default Logo;
