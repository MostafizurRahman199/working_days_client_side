/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import axios from 'axios';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchAllJob = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-jobs`);
        if (response && response.data) {
          setJobs(response.data);
          setFilteredJobs(response.data);
          const uniqueCategories = [...new Set(response.data.map((job) => job.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchAllJob();
  }, []);

  const handleSearch = () => {
    const searchResult = jobs.filter((job) =>
      job.job_title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(searchResult);
  };

  const handleFilterCategory = () => {
    if (filterCategory) {
      const filtered = jobs.filter((job) => job.category === filterCategory);
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  };

  const handleSort = () => {
    const sorted = [...filteredJobs].sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredJobs(sorted);
  };

  const handleReset = () => {
    setSearch('');
    setFilterCategory('');
    setSortOrder('');
    setFilteredJobs(jobs);
  };

  useEffect(() => {
    handleFilterCategory();
  }, [filterCategory]);

  useEffect(() => {
    handleSort();
  }, [sortOrder]);

  return (
    // <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
    <div className="container px-6 py-10 mx-auto min-h-screen flex flex-col justify-between bg-[#17153B]">
      <div>
        <div className="w-full flex flex-col sm:flex sm:flex-wrap md:flex-row justify-center items-center gap-5">
          <div className='w-full md:w-fit'>
            <select
              name="category"
              id="category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full  border px-4 py-2 rounded-lg text-gray-800 bg-gray-100 focus:border-purple-500 focus:ring-purple-200"
            >
              <option value="">Filter By Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category} className='w-full '>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}

            className='w-full md:w-fit'
          >
            <div className="w-full flex flex-wrap p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-purple-200 focus-within:border-purple-500 gap-2">
              <input
                className="w-full md:w-fit px-6 py-2 text-gray-800 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent rounded-lg "
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button
                type="submit"
                className="w-full md:w-fit px-4 py-2 text-sm font-medium tracking-wider text-white uppercase bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>

          <div className='w-full md:w-fit'>
            <select
              name="sort"
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full md:w-fit border px-4 py-2 rounded-lg text-gray-800 bg-gray-100 focus:border-purple-500 focus:ring-purple-200"
            >
              <option value="">Sort By Deadline</option>
              <option value="asc">Ascending Order</option>
              <option value="dsc">Descending Order</option>
            </select>
          </div>

          <button
            onClick={handleReset}
            className="w-full md:w-fit px-4 py-2 text-sm font-medium tracking-wider text-white uppercase bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
