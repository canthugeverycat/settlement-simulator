type LoaderProps = {
  className?: string;
  color?: 'white' | 'primary';
};

/**
 * A simple loader component
 */
const Loader = ({ className = '', color = 'primary' }: LoaderProps) => {
  const colorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
  }[color];

  return (
    <span
      className={`${className} ${colorClasses} my-1 block size-8 animate-ping rounded-full`}
    ></span>
  );
};

export default Loader;
