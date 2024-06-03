import HistoryItem from '../../components/HistoryItem';
import InputForm from '../../components/InputForm';
import Logo from '../../components/Logo';
import Separator from '../../components/Separator';

/**
 * Page for Party A
 */
const PartyA = () => {
  return (
    <div className="flex max-w-[400px] flex-col items-center rounded-md bg-white px-6 py-10 shadow-lg">
      {/* Logo and title */}
      <Logo size="extrasmall" />
      <p className="mb-4 text-3xl">Party A</p>

      <Separator />

      {/* Settlement input with button */}
      <p className="mb-4 mt-6">Settlement amount</p>
      <InputForm status="accepted" />

      <Separator direction="top" spacing="small" />

      {/* Last change */}
      <p className="mb-4">Latest change</p>
      <HistoryItem />
    </div>
  );
};

export default PartyA;
