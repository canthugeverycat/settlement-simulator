import { useState } from 'react';

/**
 * A Textarea that can be shown or hidden
 */
const ToggleableTextarea = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleMessageVisibility = () => {
    setShowMessage((prev) => !prev);
  };

  return (
    <div>
      {showMessage && (
        <textarea
          onChange={() => {}}
          className="h-14 w-full rounded-md border p-2 text-center font-sans text-sm focus:ring-transparent"
        />
      )}

      <div
        className="mb-4 flex cursor-pointer items-center justify-center text-xs font-semibold uppercase text-light-grey hover:text-secondary"
        onClick={handleMessageVisibility}
      >
        {showMessage ? 'Hide' : 'Add a'} message
      </div>
    </div>
  );
};

export default ToggleableTextarea;
