import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { PARTIES, URL_PARAMS, WS_ACTIONS } from './globals/const';
import { SettlementPartyType } from './globals/types';
import History from './routes/history';
import LandingPage from './routes/landing';
import Settlement from './routes/settlement';
import { RootStateType } from './store/rootReducer';
import {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
  fetchOneItem,
  fetchOneItemFailure,
  fetchOneItemSuccess,
} from './store/settlements/actions';
import {
  deleteAllSettlements as httpDeleteAllSettlements,
  fetchOneSettlement as httpFetchOneSettlement,
} from './utils/api';
import useWebSocket, { WebSocketData } from './utils/useWebSocket';

/**
 * Main skeleton of the app, handles routing and API fetching logic
 */
const App = () => {
  const dispatch = useDispatch();

  const data = useSelector((store: RootStateType) => store.settlements.data);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const party = params.get(URL_PARAMS.PARTY) as SettlementPartyType;

  /**
   * Deletes all settlement items
   */
  const deleteAllSettlements = useCallback(async () => {
    try {
      await httpDeleteAllSettlements();
      if (data.length) {
        window.location.reload();
      }

      dispatch(fetchItemsSuccess([]));
    } catch (e) {
      console.error(e);
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
    deleteAllSettlements();
  }, [deleteAllSettlements]);

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
    <main className="flex min-h-screen items-center justify-center overflow-auto bg-gradient-to-r from-lilac to-indigo">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/settlement" element={<Settlement />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </main>
  );
};

export default App;
