import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Separator from '../../components/Separator';
import { PARTIES } from '../../globals/const';

/**
 * Landing Page
 */
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section
      className="flex max-w-[400px] flex-col items-center rounded-md bg-white px-6 py-10 shadow-lg"
      aria-label="Welcome"
    >
      <Header className="mb-4" />

      <Separator direction="top" spacing="small" />

      <h2 className="mb-4">Please choose your party</h2>

      <div className="flex flex-row gap-4">
        <Button
          size="medium"
          color="secondary"
          onClick={() => navigate(`/settlement?party=${PARTIES.A}`)}
        >
          Party A
        </Button>
        <Button
          size="medium"
          color="secondary"
          onClick={() => navigate(`/settlement?party=${PARTIES.B}`)}
        >
          Party B
        </Button>
      </div>
    </section>
  );
};

export default LandingPage;
