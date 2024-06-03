import StatusPill from '../StatusPill';

/**
 * A history item showing one activity
 */
const HistoryItem = () => {
  return (
    <div className="relative flex w-full flex-col rounded-md border-2 p-4 pb-8 shadow-lg">
      {/* Party name */}
      <span className="absolute -top-3 left-2 rounded-full border-2 bg-white px-2 py-0.5 text-xs font-bold uppercase">
        Party B
      </span>

      {/* Message */}
      <p>"Not enough money, sorry!"</p>

      {/* Datetime */}
      <span className="absolute bottom-2.5 left-4 text-xs text-light-grey">
        Mon 3 Jun 16:29
      </span>

      {/* Status */}
      <StatusPill
        className="bottom-2 right-2"
        size="small"
        animate={false}
        status="rejected"
      />
    </div>
  );
};

export default HistoryItem;
