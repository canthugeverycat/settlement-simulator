import Button from '../Button';
import StatusPill from '../StatusPill';

type InputProps = {
  className?: String;
  status: 'accepted' | 'rejected' | 'pending';
};

/**
 * A form with an input field and a button
 * Used by both parties
 * @param {InputProps} props
 */
const InputForm = ({ className = '', status }: InputProps) => {
  const outlineColorClass = {
    accepted: 'outline-success',
    rejected: 'outline-error',
    pending: 'outline-info',
  }[status];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div
        className={`${className} ${outlineColorClass} relative mb-8 rounded-md outline outline-4`}
      >
        <StatusPill className="-bottom-4 left-2" {...{ status }} />

        <input
          type="number"
          min={0}
          value={400}
          onChange={() => {}}
          className="w-full rounded-md border bg-white p-2 text-center text-5xl shadow-lg focus:ring-transparent"
        />
      </div>
      <Button color="primary" size="full" className="mb-8">
        Submit
      </Button>
    </form>
  );
};

export default InputForm;
