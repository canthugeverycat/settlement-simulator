import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type {
  SettlementPartyType,
  SettlementStatusType,
} from '../../globals/types';
import type { RootStateType } from '../../store/rootReducer';
import {
  createItem,
  createItemFailure,
  createItemSuccess,
} from '../../store/settlements/actions';
import {
  acceptSettlement as httpAcceptSettlement,
  rejectSettlement as httpRejectSettlement,
  submitSettlement as httpSubmitSettlement,
} from '../../utils/api';
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
  const dispatch = useDispatch();
  const [value, setValue] = useState(amount);
  const [text, setText] = useState(message || '');

  const isUpdating = useSelector(
    (store: RootStateType) => store.settlements.isUpdating
  );

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(parseFloat(e.target.value));

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  /**
   * Creates a settlement item
   * This covers all change cases from either party
   *
   * @param {string} newStatus The new status of the settlement
   */
  const handleCreateSettlementItem = async (
    newStatus: SettlementStatusType
  ) => {
    const body = {
      amount: value,
      message: text,
    };

    const http = {
      pending: httpSubmitSettlement,
      accepted: httpAcceptSettlement,
      rejected: httpRejectSettlement,
    }[newStatus];

    dispatch(createItem(body));

    try {
      const data = await http(body);

      dispatch(createItemSuccess(data));
    } catch (e) {
      console.error(e);
      dispatch(createItemFailure());
    }
  };

  useEffect(() => {
    setValue(amount);

    if (status === 'pending' || party === 'b') {
      setText(message || '');
    }
  }, [amount, message, status, party]);

  const outlineColorClass =
    {
      accepted: 'outline-success',
      rejected: 'outline-error',
      pending: 'outline-info',
    }[status] || 'outline-primary';

  return (
    <>
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
          <Button
            color="success"
            disabled={isUpdating}
            showLoader={isUpdating}
            size="large"
            className="mb-8"
            onClick={() => handleCreateSettlementItem('accepted')}
          >
            Agree
          </Button>
          <Button
            disabled={isUpdating}
            showLoader={isUpdating}
            color="error"
            size="large"
            className="mb-8"
            onClick={() => handleCreateSettlementItem('rejected')}
          >
            Dispute
          </Button>
        </div>
      ) : (
        <Button
          disabled={!value || isUpdating}
          showLoader={isUpdating}
          color="primary"
          size="full"
          className="mb-8"
          onClick={() => handleCreateSettlementItem('pending')}
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default InputForm;
