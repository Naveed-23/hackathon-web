import { useNavigate } from "react-router-dom";

export default function Overview({ challenge }: any) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate('/edit-challenge', { state: { challenge } });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <header className="py-3 px-8 shadow-md bg-white">
        <div className="container mx-auto flex justify-between items-center relative mt-2">
          <div className="text-lg font-semibold relative">
            <span className="">Overview</span>
            <div className="absolute left-[-12px] right-[-12px] bottom-[-17px] h-1 bg-green-600"></div>
          </div>
          <div className="flex space-x-4">
            <button
              className="text-white bg-green-600 px-8 py-2 rounded-md"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-red-500 border border-red-500 px-8 py-2 rounded-md"
              onClick={() => navigate("/")}
            >
              Delete
            </button>
          </div>
        </div>
      </header>
        <div className="mx-40 my-12 p-2 mr-[28rem]">
          <div className="text-gray-700 text-xl mb-6">
            {challenge.description}
          </div>
        </div>
    </div>
  );
}
