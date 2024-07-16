import Logo from '../Logo';

type HeaderProps = {
  className?: string;
};

/**
 * A simple component for displaying logo and title
 * @param {HeaderProps} props
 */
const Header = ({ className = '' }: HeaderProps) => (
  <div className={`${className} flex flex-col items-center`}>
    <Logo size="large" className="mb-4" />
  </div>
);

export default Header;
