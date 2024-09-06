import { createContext, useContext, useState, ReactNode } from 'react';
import DsBt from "../assets/Ds-Btcmp.png";
import Butterfly from "../assets/Butterfly.png";
import Graduate from "../assets/Graduate.png";
import Hiking from "../assets/Hiking.png";
import Airline from "../assets/Airline.png";
import Spring from "../assets/Spring.png";

// Define the Challenge type
interface Challenge {
  id: number;
  title: string;
  status: 'Upcoming' | 'Active' | 'Past';
  time: string;
  description: string;
  level: string;
  image: any;
}

// Define the context type
interface ChallengeContextType {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  setCurrentChallenge: (challenge: Challenge | null) => void;
  updateChallenge: (updatedChallenge: Challenge) => void;
}

// Create the context with default values
const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

// Context provider component
export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Data Science Bootcamp - Graded Datathon",
      status: "Upcoming",
      time: "Starts in 00 : 15 : 22",
      level: "Easy",
      description: "Description for Challenge 1",
      image: DsBt, // Replace with your image paths
    },
    {
      id: 2,
      title: "Data Sprint 72 – Butterfly Identification",
      status: "Upcoming",
      time: "Starts in 00 : 12 : 34",
      level: "Easy",
      description: "Description for Challenge 1",
      image: Butterfly,
    },
    {
      id: 3,
      title: "Data Sprint 71 – Weather Recognition",
      status: "Active",
      time: "Ends in 01 : 17 : 10",
      level: "Easy",
      description: "Description for Challenge 1",
      image: Spring,
    },
    {
      id: 4,
      title: "Data Sprint 70 - Airline Passenger Satisfaction",
      status: "Active",
      time: "Ends in 00 : 11", 
      description: "Description for Challenge 1",
      level: "Easy",
      image: Airline,
    },
    {
      id: 5,
      title: "Engineering Graduates Employment Outcomes",
      status: "Past",
      time: "Ended on 16th May '22 09:00 PM",
      level: "Easy",
      description: "Description for Challenge 1",
      image: Graduate,
    },
    {
      id: 6,
      title: "Travel Insurance Claim Prediction",
      status: "Past",
      time: "Ended on 16th May '22 09:00 PM",
      level: "Easy",
      description: "Description for Challenge 1",
      image: Hiking,
    },
  ]);

  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);

  // Function to update a challenge
  const updateChallenge = (updatedChallenge: Challenge) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((ch) =>
        ch.id === updatedChallenge.id ? updatedChallenge : ch
      )
    );
  };

  return (
    <ChallengeContext.Provider
      value={{ challenges, currentChallenge, setCurrentChallenge, updateChallenge }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

// Custom hook to use the Challenge context
export const useChallengeContext = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error("useChallengeContext must be used within a ChallengeProvider");
  }
  return context;
};
