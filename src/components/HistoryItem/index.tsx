import type {
  SettlementPartyType,
  SettlementStatusType,
} from '../../globals/types';
import { getHumanReadableDatetime } from '../../utils/functions';
import StatusPill from '../StatusPill';

type HistoryItemProps = {
  createdAt: string;
  party: SettlementPartyType;
  status: SettlementStatusType;
  amount: number;
  className?: string;
};

/**
 * A history item showing one activity
 * @param {HistoryItemProps} props;
 */
const HistoryItem = ({
  createdAt,
  party,
  status,
  amount,
  className = '',
}: HistoryItemProps) => {
  const baseClass =
    'relative flex min-w-[240px] max-w-[90%] flex-col rounded-md border-2 p-4 pb-8 shadow-lg';

  const alignContainerClasses = {
    a: 'mr-auto',
    b: 'ml-auto',
  }[party];

  const alignNameClasses = {
    a: 'left-2',
    b: 'right-2',
  }[party];

  const alignDateClasses = {
    a: 'left-4',
    b: 'right-4',
  }[party];

  const alignStatusClasses = {
    a: 'right-2',
    b: 'left-2',
  }[party];

  return (
    <div className={`${className} ${alignContainerClasses} ${baseClass}`}>
      {/* Party name */}
      <span
        className={`${alignNameClasses} absolute -top-3 rounded-full border-2 bg-white px-2 py-0.5 text-xs font-bold uppercase`}
      >
        Party {party}
      </span>

      {/* Amount */}
      <span className={`text-center text-lg font-bold text-primary`}>
        ${amount}
      </span>

      {/* Datetime */}
      <span
        className={`${alignDateClasses} absolute bottom-2.5 text-xs text-light-grey`}
      >
        {getHumanReadableDatetime(createdAt)}
      </span>

      {/* Status */}
      <StatusPill
        className={`${alignStatusClasses} bottom-2`}
        size="small"
        animate={false}
        {...{ status }}
      />
    </div>
  );
};

export default HistoryItem;
