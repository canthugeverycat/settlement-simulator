import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { PARTIES, URL_PARAMS, WS_ACTIONS } from './globals/const';
import { SettlementPartyType } from './globals/types';
import History from './routes/history';
import LandingPage from './routes/landing';
import Settlement from './routes/settlement';
import {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
  fetchOneItem,
  fetchOneItemFailure,
  fetchOneItemSuccess,
} from './store/settlements/actions';
import {
  fetchOneSettlement as httpFetchOneSettlement,
  fetchSettlements as httpFetchSettlements,
} from './utils/api';
import useWebSocket, { WebSocketData } from './utils/ws';

/**
 * Main skeleton of the app, handles routing and API fetching logic
 */
const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const party = params.get(URL_PARAMS.PARTY) as SettlementPartyType;

  /**
   * Fetches all settlement items from the API
   */
  const fetchSettlements = useCallback(async () => {
    dispatch(fetchItems());
    try {
      const data = await httpFetchSettlements();

      dispatch(fetchItemsSuccess(data));
    } catch (e) {
      console.error(e);
      dispatch(fetchItemsFailure());
    }
  }, []);

  /**
   * Fetches a new settlement item when WS notifies us
   *
   * @param {WebSocketData} data
   */
  const handleFetchNewItem = async (data: WebSocketData) => {
    const { id } = data;

    dispatch(fetchOneItem());
    try {
      const data = await httpFetchOneSettlement(id);

      dispatch(fetchOneItemSuccess(data));
    } catch (e) {
      console.error(e);
      dispatch(fetchOneItemFailure());
    }
  };
  const ws = useWebSocket({ onMessage: handleFetchNewItem });

  useEffect(() => {
    fetchSettlements();
  }, [fetchSettlements]);

  /**
   * Subscribe to the opposite party updates
   */
  useEffect(() => {
    if (!ws || ![PARTIES.A, PARTIES.B].includes(party)) return;

    const partyToSubscribeTo = party === PARTIES.A ? PARTIES.B : PARTIES.A;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          action: WS_ACTIONS.SUBSCRIBE,
          party: partyToSubscribeTo,
        })
      );
    };

    return () => ws.close();
  }, [ws, party]);

  return (
    <main className="flex min-h-screen items-center justify-center overflow-scroll bg-gradient-to-r from-lilac to-indigo">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/settlement" element={<Settlement />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </main>
  );
};

export default App;
