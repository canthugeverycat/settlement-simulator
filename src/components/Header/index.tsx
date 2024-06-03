import NetworkGif from '../../assets/network.webp';

/**
 * A simple component for displaying logo and title
 */
const Header = () => (
  <div className="flex flex-col items-center">
    <a href="https://leylinepro.com/" target="_blank" rel="noreferrer">
      <img
        className="mask-image-logo mb-4 h-28 w-48"
        src={NetworkGif}
        alt="LeyLine Logo"
      />
    </a>
    <h1 id="title" className="border-b-2 pb-4 text-xl">
      Welcome to LeyLine
    </h1>
  </div>
);

export default Header;
