import { useCommunication } from '../../context/CommunicationContext';

export const TopBanner = () => {
  const { openLeadCapture } = useCommunication();

  const handleClaimSpot = () => {
    openLeadCapture('Early Bird Banner');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#F28500] via-[#FF9A1F] to-[#F28500] py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 md:gap-4 text-white text-sm">
        <span className="font-medium text-center text-xs sm:text-sm leading-tight">
          <span className="font-bold">🚀 EARLY BIRD</span>
          <span className="hidden sm:inline"> — 50% off setup | ROI guaranteed or money back | First 50 restaurants</span>
          <span className="sm:hidden"> — 50% off setup | ROI guaranteed | First 50</span>
        </span>
        <button
          onClick={handleClaimSpot}
          className="bg-[#0A1628] text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#132238] transition-colors flex-shrink-0 whitespace-nowrap"
        >
          Get Your Quote
        </button>
        {/* NO CLOSE BUTTON - This is intentional */}
      </div>
    </div>
  );
};

export default TopBanner;
