import { useCommunication } from '../../context/CommunicationContext';

export const TopBanner = () => {
  const { openLeadCapture } = useCommunication();

  const handleClaimOffer = () => {
    openLeadCapture('Early Bird');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-orange-600 to-rose-500 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-white text-sm">
        <span className="hidden sm:inline">🎉</span>
        <span className="font-medium text-center">
          <span className="font-bold">EARLY BIRD</span>
          <span className="hidden sm:inline"> — First 50 restaurants get 15% off setup + 3 months free</span>
          <span className="sm:hidden"> — 15% off + 3mo free</span>
        </span>
        <button 
          onClick={handleClaimOffer}
          className="bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-orange-50 transition-colors flex-shrink-0"
        >
          Claim Offer
        </button>
        {/* NO CLOSE BUTTON - This is intentional */}
      </div>
    </div>
  );
};

export default TopBanner;

