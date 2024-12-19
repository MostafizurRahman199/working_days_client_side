import { Link } from 'react-router-dom';

const JobCard = ({ job= {} } ) => {
  return (
    <Link
      to={`/job/${job?._id}`}
      className="w-full max-w-sm p-4 bg-white/30  hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-red-500 rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-white">
          Deadline: {new Date(job?.deadline).toLocaleDateString()}
        </span>
        <span className="px-2 py-1 text-[10px] text-white uppercase bg-purple-700 rounded-full">
          {job?.category}
        </span>
      </div>

      <div className="bg-white p-4 rounded-2xl">
        <h1 className="text-lg font-semibold text-gray-800">
          {job?.job_title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {job?.description?.length > 100
            ? `${job?.description.substring(0, 100)}...`
            : job.description}
        </p>
        <div className="mt-4">
          <p className="text-sm font-bold text-gray-700">
            Range: ${job?.min_price} - ${job?.max_price}
          </p>
          <p className="text-sm font-bold text-gray-700">
            Total Bids: {job?.totalBid}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
