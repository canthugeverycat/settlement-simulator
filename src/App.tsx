import { Route, Routes } from 'react-router-dom';

import LandingPage from './routes/landing';

/**
 * Main skeleton of the app, handles routing
 */
const App = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-lilac to-indigo">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
};

export default App;
