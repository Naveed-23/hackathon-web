import AI from '../assets/AI.svg'
import DS from '../assets/DS.svg'
import AIC from '../assets/AIC.svg'

const LandingFooter = () => {
  return (
    <div className="bg-veryDarkBg py-6">
      <div className="container mx-auto flex justify-around items-center text-white text-center mt-10 mb-10">
        
        <div className='flex items-center space-x-4'>
          <img src={AI} alt="AI model submissions" className="w-12 h-12" />
          <div className="text-left">
            <span className="text-2xl font-bold">100K+</span>
            <span className="block text-Slatetxt">AI model submissions</span>
          </div>
        </div>
        
        <div className='flex items-center space-x-4'>
          <img src={DS} alt="Data Scientists" className="w-12 h-12" />
          <div className="text-left">
            <span className="text-2xl font-bold">50K+</span>
            <span className="block text-Slatetxt">Data Scientists</span>
          </div>
        </div>
        
        <div className='flex items-center space-x-4'>
          <img src={AIC} alt="AI Challenges hosted" className="w-12 h-12" />
          <div className="text-left">
            <span className="text-2xl font-bold">100+</span>
            <span className="block text-Slatetxt">AI Challenges hosted</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LandingFooter;

  