import Button from '../Button';
import StatusPill from '../StatusPill';
import ToggleableTextarea from '../ToggleableTextArea';

type InputProps = {
  className?: String;
  status: 'accepted' | 'rejected' | 'pending';
  party: string | null;
};

/**
 * A form with an input field and a button
 * Used by both parties
 * @param {InputProps} props
 */
const InputForm = ({ className = '', status, party }: InputProps) => {
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
      {/* Amount input */}
      <div
        className={`${className} ${outlineColorClass} relative mb-8 rounded-md outline outline-4`}
      >
        <StatusPill className="-bottom-4 left-2" {...{ status }} />

        <input
          type="number"
          disabled={party === 'b'}
          min={0}
          value={400}
          onChange={() => {}}
          className="w-full rounded-md border bg-white p-2 text-center text-5xl shadow-lg focus:ring-transparent"
        />
      </div>

      {/* Optional message */}
      <ToggleableTextarea />

      {/* Action Buttons */}
      {party === 'b' ? (
        <div className="flex flex-row justify-center gap-4">
          <Button color="success" size="large" className="mb-8">
            Agree
          </Button>
          <Button color="error" size="large" className="mb-8">
            Dispute
          </Button>
        </div>
      ) : (
        <Button color="primary" size="full" className="mb-8">
          Submit
        </Button>
      )}
    </form>
  );
};

export default InputForm;
