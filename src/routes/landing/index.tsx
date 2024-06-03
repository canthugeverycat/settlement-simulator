import Button from '../../components/Button';
import Header from '../../components/Header';

/**
 * Landing Page
 */
const LandingPage = () => (
  <section
    className="custom-animate-pulse-border flex max-w-[400px] flex-col items-center rounded-md bg-white px-6 py-10 shadow-lg"
    aria-labelledby="title"
  >
    <Header />

    <h2 className="mt-4">Please choose your party</h2>

    <div className="mt-4 flex flex-row gap-4">
      <Button size="small" color="secondary" onClick={() => {}}>
        Party A
      </Button>
      <Button size="small" color="secondary" onClick={() => {}}>
        Party B
      </Button>
    </div>
  </section>
);

export default LandingPage;
