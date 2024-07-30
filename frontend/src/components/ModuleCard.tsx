import courseTemp from '../assets/dashboard/Screenshot 2024-06-28 141015.png';
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

interface CourseIt {
  thumbnail?: string;
  _id: string;
  tags: string[];
  status: string;
  enrolledUsers: string[];
  CourseSub: string[];
  price: number;
  title: string;
}

const ModuleCard = ({ thumbnail, _id, tags, price, title }: CourseIt) => {
  return (
    <div className='max-w-sm rounded-lg border-2 shadow-lg flex flex-col items-center bg-white dark:bg-gray-800 hover:shadow-2xl transition-shadow duration-300'>
      <img className='w-full h-48 object-cover rounded-t-lg' src={thumbnail || courseTemp} alt="course thumbnail" />
      <div className='flex flex-col items-center p-4'>
        <h1 className='text-center text-2xl font-medium text-gray-800 dark:text-white mb-2'>{title}</h1>
        <div className='flex flex-wrap justify-center gap-2 mb-3'>
          {tags.map((tag) => (
            <span className='bg-blue-500 rounded-full px-3 py-1 text-white text-sm transition-transform transform hover:scale-105' key={tag}>{tag}</span>
          ))}
        </div>
        <div className='flex justify-between items-center w-full px-6 my-3'>
          <div className='flex items-center bg-gray-200 px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
            <FaRupeeSign className='text-green-600' />
            <p className='text-3xl font-bold text-green-600 ml-1'>{price}</p>
          </div>
          <div className='flex items-center gap-1'>
            <AiOutlineLike className='text-gray-800 dark:text-white' />
            <p className='text-gray-800 dark:text-gray-300'>10.5K</p>
          </div>
        </div>
        <a href={`/buy-modules/${_id}`} className='w-full'>
          <button className='w-full font-medium text-lg text-white rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 transition-colors duration-300'>Buy</button>
        </a>
      </div>
    </div>
  );
}

export default ModuleCard;
