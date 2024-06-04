import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import History from './routes/history';
import LandingPage from './routes/landing';
import Settlement from './routes/settlement';
import {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
} from './store/settlements/actions';
import { fetchSettlements as httpFetchSettlements } from './utils/api';

/**
 * Main skeleton of the app, handles routing
 */
const App = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchSettlements();
  }, [fetchSettlements]);

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
