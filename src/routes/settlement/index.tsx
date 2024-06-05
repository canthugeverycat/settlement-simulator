import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import HistoryItem from '../../components/HistoryItem';
import InputForm from '../../components/InputForm';
import Loader from '../../components/Loader';
import Logo from '../../components/Logo';
import Separator from '../../components/Separator';
import { PARTIES, URL_PARAMS } from '../../globals/const';
import { SettlementPartyType } from '../../globals/types';
import type { RootStateType } from '../../store/rootReducer';

/**
 * Settlement Page
 */
const Settlement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paramParty = params.get(URL_PARAMS.PARTY) as SettlementPartyType;
  const party = [PARTIES.A, PARTIES.B].includes(paramParty || '')
    ? paramParty
    : null;

  const isFetching = useSelector(
    (store: RootStateType) => store.settlements.isFetching
  );

  // Get last item from the settlement
  const [lastItem] = useSelector(
    (store: RootStateType) => store.settlements.data
  );

  // Get last item from the other party
  const lastResponse = useSelector((store: RootStateType) =>
    store.settlements.data.find((item) => item.party !== party)
  );

  /**
   * Generates an appropriate last message depending on the settlement state
   */
  const getEmptyHistoryText = () => {
    let text = '';

    if (lastItem) text = `The other party hasn't responded yet`;

    if (!lastItem && party === PARTIES.A)
      text = 'Suggest an amount for the other party to respond';

    if (!lastItem && party === PARTIES.B)
      text = `Wait for the other party to submit a suggestion`;

    return text;
  };

  useEffect(() => {
    if (!party || (party !== PARTIES.A && party !== PARTIES.B)) navigate('/');
  }, [party, navigate]);

  return (
    <div className="my-4 flex max-w-[400px] flex-col items-center rounded-md bg-white px-6 py-10 shadow-lg">
      {/* Logo and title */}
      <Logo size="extrasmall" />
      <p className="mb-4 text-3xl">Party {party?.toUpperCase()}</p>

      <Separator />

      {/* Settlement input with button */}
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <p className="mb-4 mt-6">Settlement amount</p>
          <InputForm {...{ ...lastItem, party }} />
        </>
      )}

      <Separator direction="top" spacing="small" />

      {/* Last update from other party */}
      <p className="mb-4">
        Last {party === PARTIES.A ? 'response' : 'request'}
      </p>
      {lastResponse && (
        <HistoryItem className="ml-auto mr-auto w-full" {...lastResponse} />
      )}

      {!lastResponse && (
        <p className="text-center text-sm text-light-grey">
          {getEmptyHistoryText()}
        </p>
      )}

      <NavLink
        to={`/history?party=${party}`}
        className="mt-2 text-sm font-bold uppercase text-primary transition-all duration-200 hover:scale-105 active:scale-100"
      >
        See full history
      </NavLink>
    </div>
  );
};

export default Settlement;
