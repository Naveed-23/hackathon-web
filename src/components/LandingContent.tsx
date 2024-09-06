import { useNavigate } from 'react-router-dom';
import Rocket from '../assets/PicsArt_04-14-04.42 1.svg'

const LandingContent = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-darkBg px-28 py-20'>
      <main className="flex items-center justify-center mb-12">
        <div className="absolute flex mr-[700px] mt-[184px] ml-[120px] mb-[93px] p-4">
          <div className="h-28 w-4 bg-yellow-500 mr-8"></div>
          <div>
            <h1 className="text-5xl font-medium text-white mb-6">
              Accelerate Innovation with Global AI Challenges
            </h1>
            <div className=''>
              <p className="text-lg text-gray-300 mb-8">
                AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.
              </p>
            </div>
            <button onClick={() => {
              navigate('/create-challenge')
            }} className="bg-Slatetxt hover:bg-slate-200 text-darkBg font-semibold py-2 px-6 rounded-lg">
              Create Challenge
            </button>
          </div>
        </div>

        {/* Rocket Image */}
        <div className="w-3/4 flex justify-end items-center">
          <img src={Rocket} alt="Rocket" className="w-80 h-auto" />
        </div>
      </main>
    </div>
  );
};

export default LandingContent;