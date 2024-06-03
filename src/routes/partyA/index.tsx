import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Separator from '../../components/Separator';

/**
 * Page for Party A
 */
const PartyA = () => {
  return (
    <div className="flex max-w-[400px] flex-col items-center rounded-md bg-white px-6 py-10 shadow-lg">
      <Logo size="extrasmall" />
      <p className="mb-4 text-3xl">Party A</p>

      <Separator />

      <p id="subtitle" className="mb-4 mt-6">
        Settlement amount
      </p>

      <div className="relative mb-8 rounded-md outline outline-4 outline-green-600">
        <span className="custom-animate-pulse absolute -bottom-4 left-2 rounded-full bg-green-600 px-3 py-1 text-sm font-bold uppercase text-white">
          Accepted
        </span>
        <input
          type="number"
          min={0}
          value={400}
          onChange={() => {}}
          className="w-full rounded-md border bg-white p-2 text-center text-5xl shadow-lg focus:ring-transparent"
        />
      </div>

      <Button color="primary" size="full" className="mb-8">
        Submit
      </Button>

      <Separator direction="top" spacing="small" />

      <p className="mb-4">Latest change</p>
      <div className="relative flex w-full flex-col rounded-md border-2 p-4 pb-8 shadow-lg">
        <span className="absolute -top-3 left-2 rounded-full border-2 bg-white px-2 py-0.5 text-xs font-bold uppercase">
          Party B
        </span>
        <span className="absolute bottom-2.5 left-4 text-xs text-light-grey">
          Mon 3 Jun 16:29
        </span>
        <span className="bg-error absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-xs font-bold uppercase text-white">
          Rejected
        </span>
        <p>"Not enough money, sorry!"</p>
      </div>
    </div>
  );
};

export default PartyA;
