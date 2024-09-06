import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import { createChallenge } from '../services/apiCreateHackathon';
import Spinner from '../components/Spinner';

const CreateChallenge = () => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
    level: 'Easy',
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Image file for upload
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createChallenge({
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        level: formData.level,
      }, imageFile || undefined);

      console.log('Challenge created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading) return <Spinner />

  return (
    <>
      <LandingHeader />
      <div className='bg-card'>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 p-12 mx-10">Challenge Details</h2>
      </div>
      <div className="flex flex-col justify-start p-8 bg-white mx-10 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label className="block text-lg mb-2 font-medium text-gray-700">Challenge Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full max-w-lg p-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full max-w-lg p-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full max-w-lg p-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-2/6 p-2 pb-24 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center">
                {formData.image && (
                  <img src={formData.image} alt="Challenge" className="mr-4 w-32 h-32 object-cover rounded-md" />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 block text-base p-1 text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-gray-700">Level Type</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="mt-1 block w-full max-w-xs p-2 pr-8 rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flex">
            <button
              type="submit"
              className="bg-green-600 text-Slatetxt py-2 px-10 mb-12 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Challenge'}
            </button>
            <button
              className="bg-green-600 text-Slatetxt py-2 px-10 mb-12 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateChallenge;
