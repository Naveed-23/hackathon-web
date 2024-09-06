import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Skilllevel from '../assets/skilllevel.svg';
import LandingHeader from '../components/LandingHeader';
import Overview from '../components/Overview';
import supabase from '../services/supabase';
import Spinner from '../components/Spinner';

interface Challenge {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  level: string;
  image: any;
  status: 'Upcoming' | 'Active' | 'Past'; 
  time: string;
}

const formatDateTime = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

const getChallengeStatusText = (startDate: string, endDate: string, status: string) => {

  if (status === 'Upcoming') {
    return `Starts on ${formatDateTime(startDate)} (India Standard Time)`;
  } else if (status === 'Active') {
    return `Ends in ${formatDateTime(endDate)} (India Standard Time)`;
  } else {
    return `Ended on ${formatDateTime(endDate)} (India Standard Time)`;
  }
};

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the challenge id from the URL
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallengeById = async (challengeId: string) => {
    try {
      const { data, error } = await supabase
        .from('hackathon')
        .select('*')
        .eq('id', challengeId)
        .single(); // fetch a single record

      if (error) throw error;
      setCurrentChallenge(data); // Set the fetched challenge
    } catch (error) {
      console.error('Error fetching challenge:', error);
      setError('Failed to load challenge data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchChallengeById(id); // Fetch the challenge data by id
    } else {
      navigate('/'); // Redirect if id is not present
    }
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  // If no challenge is found, redirect to the homepage
  if (!currentChallenge) {
    navigate('/');
    return null;
  }

  const statusText = getChallengeStatusText(
    currentChallenge.startDate,
    currentChallenge.endDate,
    currentChallenge.status
  );

  return (
    <>
      <LandingHeader />
      <div className="">
        <div className="bg-darkBg p-32">
          <div className="flex flex-col items-start">
            <span className="bg-yellow-300 text-yellow-800 px-3 py-1 rounded-lg text-base mb-4">
              {statusText}
            </span>
            <h1 className="text-5xl text-Slatetxt font-medium mb-8">{currentChallenge.title}</h1>
            <p className="text-lg text-Slatetxt mb-8">
            {"Identify the class to which each butterfly belongs to" || 'No description available'}
            </p>
            <span className="bg-gray-100 text-gray-800 px-4 py-2 flex gap-x-2 items-center rounded-lg text-sm">
              <img src={Skilllevel} alt="" />
              {currentChallenge.level}
            </span>
          </div>
        </div>
        <Overview challenge={currentChallenge} />
      </div>
    </>
  );
};

export default ChallengeDetail;


