type SeparatorProps = {
  spacing?: string;
  direction?: string;
};

/**
 * A simple separator component
 * @param {SeparatorProps} props
 */
const Separator = ({
  spacing = 'medium',
  direction = 'bottom',
}: SeparatorProps) => {
  const spacingClass = {
    none: '',
    small: 'my-2',
    medium: 'my-4',
    large: 'my-8',
  }[spacing];

  const directionClass = {
    bottom: 'shadow-lg',
    top: 'shadow-up-lg',
  }[direction];

  return (
    <div
      className={`${spacingClass} ${directionClass} h-[10px] w-full flex-shrink-0`}
    ></div>
  );
};

export default Separator;
