import { useState } from 'react';

import HistoryItem from '../../components/HistoryItem';
import Logo from '../../components/Logo';
import Separator from '../../components/Separator';

/**
 * History Page
 */
const History = () => {
  const [data, setData] = useState<
    {
      party: 'a' | 'b';
      status: 'accepted' | 'rejected' | 'pending';
      message?: string;
    }[]
  >([
    {
      party: 'b',
      status: 'accepted',
      message: 'Thank you! Im satisfied with this',
    },
  ]);

  return (
    <div className="max-h-with-margins flex min-w-[400px] max-w-[500px] flex-col items-center rounded-md bg-white p-6 shadow-lg">
      {/* Logo and title */}
      <Logo size="extrasmall" />
      <p className="text-l">Settlement history for parties A and B</p>

      <Separator spacing="none" />

      <div className="flex w-full flex-col gap-6 overflow-scroll py-8">
        {data.map((item) => (
          <HistoryItem {...item} />
        ))}
      </div>

      <Separator direction="top" spacing="none" />
    </div>
  );
};

export default History;
