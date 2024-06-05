import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PARTIES, STATUSES } from '../../globals/const';
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

type InputProps = {
  className?: String;
  status: SettlementStatusType;
  party: SettlementPartyType | null;
  amount: number;
};

/**
 * A form with an input field and a button
 * Used by both parties
 * @param {InputProps} props
 */
const InputForm = ({ className = '', status, party, amount }: InputProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(amount);

  const isUpdating = useSelector(
    (store: RootStateType) => store.settlements.isUpdating
  );

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(parseFloat(e.target.value));

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
    };

    const http = {
      [STATUSES.PENDING]: httpSubmitSettlement,
      [STATUSES.ACCEPTED]: httpAcceptSettlement,
      [STATUSES.REJECTED]: httpRejectSettlement,
    }[newStatus];

    dispatch(createItem());

    try {
      const data = await http(body);

      dispatch(createItemSuccess(data));
    } catch (e) {
      console.error(e);
      dispatch(createItemFailure());
    }
  };

  /**
   * Determines whether controls elements are disabled
   * based on the specified criteria
   */
  const areControlsDisabled = useMemo(() => {
    let dis = false;

    if (
      (party === PARTIES.A && status === STATUSES.ACCEPTED) ||
      (party === PARTIES.B && status !== STATUSES.PENDING) ||
      isUpdating
    ) {
      dis = true;
    }
    return dis;
  }, [party, status, isUpdating]);

  useEffect(() => {
    setValue(amount);
  }, [amount]);

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
          disabled={party === PARTIES.B || areControlsDisabled}
          min={0}
          value={value}
          onChange={handleAmountChange}
          className="w-full rounded-md border bg-white p-2 text-center text-5xl shadow-lg focus:ring-transparent"
        />
      </div>

      {/* Action Buttons */}
      {party === PARTIES.B ? (
        <div className="flex flex-row justify-center gap-4">
          <Button
            color="success"
            disabled={areControlsDisabled}
            showLoader={isUpdating}
            size="large"
            className="mb-8"
            onClick={() => handleCreateSettlementItem(STATUSES.ACCEPTED)}
          >
            Agree
          </Button>
          <Button
            disabled={areControlsDisabled}
            showLoader={isUpdating}
            color="error"
            size="large"
            className="mb-8"
            onClick={() => handleCreateSettlementItem(STATUSES.REJECTED)}
          >
            Dispute
          </Button>
        </div>
      ) : (
        <Button
          disabled={!value || areControlsDisabled}
          showLoader={isUpdating}
          color="primary"
          size="full"
          className="mb-8"
          onClick={() => handleCreateSettlementItem(STATUSES.PENDING)}
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default InputForm;
