import { ChangeEvent, useState } from 'react';

import type {
  SettlementPartyType,
  SettlementStatusType,
} from '../../globals/types';
import Button from '../Button';
import StatusPill from '../StatusPill';
import ToggleableTextarea from '../ToggleableTextArea';

type InputProps = {
  className?: String;
  status: SettlementStatusType;
  party: SettlementPartyType | null;
  amount: number;
  message?: string;
};

/**
 * A form with an input field and a button
 * Used by both parties
 * @param {InputProps} props
 */
const InputForm = ({
  className = '',
  status,
  party,
  amount,
  message,
}: InputProps) => {
  const [value, setValue] = useState(amount);
  const [text, setText] = useState(message || '');

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(parseFloat(e.target.value));

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const outlineColorClass =
    {
      accepted: 'outline-success',
      rejected: 'outline-error',
      pending: 'outline-info',
    }[status] || 'outline-primary';

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
        {status && <StatusPill className="-bottom-4 left-2" {...{ status }} />}

        <input
          type="number"
          disabled={party === 'b'}
          min={0}
          value={value}
          onChange={handleAmountChange}
          className="w-full rounded-md border bg-white p-2 text-center text-5xl shadow-lg focus:ring-transparent"
        />
      </div>

      {/* Optional message */}
      <ToggleableTextarea value={text} onChange={handleMessageChange} />

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
