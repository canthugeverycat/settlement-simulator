import { Route, Routes } from 'react-router-dom';

import LandingPage from './routes/landing';
import Settlement from './routes/settlement';

/**
 * Main skeleton of the app, handles routing
 */
const App = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-lilac to-indigo">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/settlement" element={<Settlement />} />
      </Routes>
    </main>
  );
};

export default App;
