import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HistoryItem from '../../components/HistoryItem';
import Loader from '../../components/Loader';
import Logo from '../../components/Logo';
import Separator from '../../components/Separator';
import { PARTIES, URL_PARAMS } from '../../globals/const';
import { SettlementPartyType } from '../../globals/types';
import type { RootStateType } from '../../store/rootReducer';

/**
 * History Page
 */
const History = () => {
  const data = useSelector((store: RootStateType) => store.settlements.data);
  const isFetching = useSelector(
    (store: RootStateType) => store.settlements.isFetching
  );

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const party = params.get(URL_PARAMS.PARTY) as SettlementPartyType;

  useEffect(() => {
    if (!party || ![PARTIES.A, PARTIES.B].includes(party)) navigate('/');
  }, [party, navigate]);

  return (
    <div className="max-h-with-margins mx-4 flex w-full min-w-[400px] flex-col items-center rounded-md bg-white p-6 shadow-lg xs:max-w-[500px]">
      {/* Logo and title */}
      <Logo size="extrasmall" />
      <p className="text-l">Settlement history for parties A and B</p>

      <Separator spacing="none" />

      {isFetching ? (
        <Loader />
      ) : (
        <div className="flex w-full flex-col gap-6 overflow-auto py-8">
          {data.map((item) => (
            <HistoryItem key={item.id} {...item} />
          ))}
          {!data.length && (
            <p className="text-center text-sm text-light-grey">
              There is nothing to show for now. Nobody has made any actions.
            </p>
          )}
        </div>
      )}

      <Separator direction="top" spacing="none" />
    </div>
  );
};

export default History;
