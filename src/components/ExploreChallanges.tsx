import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import getHackathon from "../services/apiHackathon";
import { Input } from "./Input";

interface Challenge {
  id: number;
  title: string;
  status: "Upcoming" | "Active" | "Past";
  startDate: string;
  endDate: string;
  level: string;
  image: any;
}

const ExploreChallenges: React.FC = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: { All: true, Active: false, Upcoming: false, Past: false },
    level: { Easy: false, Medium: false, Hard: false },
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getHackathon()
      .then((data) => {
        if (data) {
          setChallenges(data);
          setFilteredChallenges(data); // Initial rendering with all challenges
        } else {
          console.log("No data or an error occurred");
        }
      })
      .catch((error) => {
        console.error("Error in getHackathon call:", error);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType: string, filterValue: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
  
      if (filterType === "status") {
        if (filterValue === "All") {
          // When "All" is selected, reset other statuses
          updatedFilters.status = { All: true, Active: false, Upcoming: false, Past: false };
        } else {
          // When another status is selected, set "All" to false
          updatedFilters.status = {
            ...prevFilters.status,
            All: false,
            [filterValue]: !prevFilters.status[filterValue],
          };
        }
      } else if (filterType === "level") {
        updatedFilters.level = {
          ...prevFilters.level,
          [filterValue]: !prevFilters.level[filterValue],
        };
      }
  
      return updatedFilters;
    });
  };
  

  useEffect(() => {
    const filteredData = challenges.filter((challenge) => {
      const matchesSearchTerm = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());

      const statusFilters = Object.entries(filters.status).filter(([key, value]) => value);
      const matchesStatus =
        statusFilters.length === 0 || filters.status.All || filters.status[challenge.status];

      const levelFilters = Object.entries(filters.level).filter(([key, value]) => value);
      const matchesLevel = levelFilters.length === 0 || filters.level[challenge.level];

      return matchesSearchTerm && matchesStatus && matchesLevel;
    });

    setFilteredChallenges(filteredData);
  }, [searchTerm, filters, challenges]);

  const calculateTimeLeft = (startDate: string, endDate: string, status: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    let difference;

    if (status === "Upcoming") {
      difference = start.getTime() - now.getTime(); // Time until start
    } else if (status === "Active") {
      difference = end.getTime() - now.getTime(); // Time until end
    } else {
      return `Ended on ${end.toLocaleDateString()} ${end.toLocaleTimeString()}`;
    }

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      return { days, hours, minutes };
    } else {
      return status === "Upcoming" ? "Started" : "Ended";
    }
  };

  return (
    <div className="bg-explore py-8">
      <h1 className="text-3xl font-medium text-center text-Slatetxt mb-6 py-12">
        Explore Challenges
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center items-center mb-20">
        <div className="relative w-auto max-w-auto flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input value={searchTerm}
            onChange={handleSearch} placeholder="Search challenges..." />
        </div>
        <div className="relative">
          <button
            className="ml-4 bg-white rounded-full p-2 px-6 shadow-md flex items-center"
            onClick={toggleDropdown}
          >
            Filter
            <span className="ml-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            </span>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="flex justify-end p-1">
                <button onClick={closeDropdown} className="text-gray-600 hover:text-gray-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="p-2 px-4 py-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Status</h3>
                  {["All", "Active", "Upcoming", "Past"].map((status) => (
                    <label key={status} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={filters.status[status as keyof typeof filters.status]}
                        onChange={() => handleFilterChange("status", status)}
                        className="mr-2"
                      />
                      {status}
                    </label>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Level</h3>
                  {["Easy", "Medium", "Hard"].map((level) => (
                    <label key={level} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={filters.level[level as keyof typeof filters.level]}
                        onChange={() => handleFilterChange("level", level)}
                        className="mr-2"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Challenges List */}
<div className="bg-hackathon min-h-screen py-28 px-32">
  <div className="grid gap-6 gap-x-[55px] md:grid-cols-2 lg:grid-cols-3">
    {filteredChallenges.map((challenge) => {
      const timeLeft = calculateTimeLeft(
        challenge.startDate,
        challenge.endDate,
        challenge.status
      );

      return (
        <div
          key={challenge.id}
          className="bg-white w-[354px] h-[500px] ml-[28px] rounded-lg overflow-hidden flex flex-col items-center"
        >
          <img
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-40 object-cover"
          />
          <div className="text-center p-4">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-md mb-5 mt-6 ${
                challenge.status === "Upcoming"
                  ? "bg-yellow-200 text-yellow-800"
                  : challenge.status === "Active"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {challenge.status}
            </span>
            <h2 className="text-lg font-semibold mb-4">{challenge.title}</h2>

            {challenge.status === "Upcoming" && (
              <div>
                <p className="text-gray-600 font-semibold">Starts in</p>
                <div className="text-2xl font-medium opacity-75 mb-4">
                  {typeof timeLeft !== "string" ? (
                    <div>
                      <div className="flex justify-center space-x-2">
                        <span>{timeLeft.days}</span>
                        <span>:</span>
                        <span>{timeLeft.hours}</span>
                        <span>:</span>
                        <span>{timeLeft.minutes}</span>
                      </div>
                      <div className="flex justify-center space-x-4 text-sm">
                        <span>days</span>
                        <span>hours</span>
                        <span>minutes</span>
                      </div>
                    </div>
                  ) : (
                    timeLeft
                  )}
                </div>
              </div>
            )}

            {challenge.status === "Active" && (
              <div>
                <p className="text-gray-600 font-semibold">Ends in</p>
                <div className="text-2xl font-medium opacity-75 mb-4">
                  {typeof timeLeft !== "string" ? (
                    <div>
                      <div className="flex justify-center space-x-2">
                        <span>{timeLeft.days}</span>
                        <span>:</span>
                        <span>{timeLeft.hours}</span>
                        <span>:</span>
                        <span>{timeLeft.minutes}</span>
                      </div>
                      <div className="flex justify-center space-x-4 text-sm">
                        <span>days</span>
                        <span>hours</span>
                        <span>minutes</span>
                      </div>
                    </div>
                  ) : (
                    timeLeft
                  )}
                </div>
              </div>
            )}

            {challenge.status === "Past" && (
              <div>
                <p className="text-gray-600 font-semibold">Ended on</p>
                <div className="text-2xl font-medium opacity-75 mb-4">
                  <p className="text-base text-gray-500 mb-6">
                    {new Date(challenge.endDate).toLocaleDateString()}{" "}
                    {new Date(challenge.endDate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => navigate(`/challenge/${challenge.id}`)}
              className={`bg-green-600 text-white px-4 py-3 rounded-md w-48 ${
                challenge.status === "Upcoming" || challenge.status === "Active"
                  ? "mb-6"
                  : "mb-2"
              }`}
            >
              Participate Now
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>
    </div> 
  );
};

export default ExploreChallenges;
