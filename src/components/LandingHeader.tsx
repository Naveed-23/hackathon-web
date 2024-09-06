import { Link } from "react-router-dom";
import aiLogo from "../assets/aiLogo.png";

const LandingHeader = () => {
    return (
        <header className="bg-white py-4 px-8 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'}>
                <div className="flex items-center"> 
                    <img src={aiLogo} alt="AI Logo" className="h-8 w-8 mr-2" /> 
                    <span className="text-lg font-bold text-black">DPhi</span>
                </div>
                </Link>
            </div>
        </header>
    );
};

export default LandingHeader;

  