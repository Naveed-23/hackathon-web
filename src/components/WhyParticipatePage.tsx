
import Vector from '../assets/Vector.svg';
import Notebook from '../assets/carbon_notebook.svg';
import Robot from '../assets/Robot.svg';
import IdentifyCard from '../assets/IdentificationCard.svg';

const WhyParticipatePage = () => {
  const cards = [
    {
      title: "Prove your skills",
      description:
        "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
      icon: Notebook,
    },
    {
      title: "Learn from community",
      description:
        "One can look and analyze the solutions submitted by other Data Scientists in the community and learn from them.",
      icon: Vector,
    },
    {
      title: "Challenge yourself",
      description:
        "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
      icon: Robot,
    },
    {
      title: "Earn recognition",
      description:
        "You will stand out from the crowd if you do well in AI challenges; it not only helps you shine in the community but also earns rewards.",
      icon: IdentifyCard,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 mb-12">
      <h1 className="text-3xl font-bold text-center mb-8 p-10">
        Why Participate in <span className="text-green-600">AI Challenges?</span>
      </h1>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-card flex flex-col items-start p-10 rounded-lg bg-card"
          >
            <img src={card.icon} className="text-3xl text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
            <p className="text-gray-600 mb-4">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyParticipatePage;
