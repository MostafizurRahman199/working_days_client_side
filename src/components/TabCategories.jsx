// /* eslint-disable react/prop-types */
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import 'react-tabs/style/react-tabs.css'
// import JobCard from './JobCard'
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const TabCategories = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchAllJob = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-jobs`);
//         if (response && response.data) {
//           setJobs(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchAllJob();
//   }, []);



//   return (
//     <Tabs>
//       <div className=' container px-6 py-10 mx-auto'>
//         <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
//           Browse Jobs By Categories
//         </h1>

//         <p className='max-w-2xl mx-auto my-6 text-center text-gray-500 '>
//           Three categories available for the time being. They are Web
//           Development, Graphics Design and Digital Marketing. Browse them by
//           clicking on the tabs below.
//         </p>
//         <div className='flex items-center justify-center'>
//           <TabList>
//             <Tab>Web Development</Tab>
//             <Tab>Graphics Design</Tab>
//             <Tab>Digital Marketing</Tab>
//           </TabList>
//         </div>
//         <TabPanel>
//           <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
           
//            {
//             jobs.map((job) => {
//               if (job?.category.toLowerCase() === 'web development') {
//                 return <JobCard job={job} key={job.id}></JobCard>;
//               }
//               return null;
//             })
//            }
           
            
//           </div>
//         </TabPanel>

//         <TabPanel>
//           <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {
//             jobs.map((job) => {
//               if (job?.category.toLowerCase() === 'graphics design') {
//                 return <JobCard job={job} key={job.id}></JobCard>;
//               }
//               return null;
//             })
//            }
//           </div>
//         </TabPanel>

//         <TabPanel>
//           <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {
//             jobs.map((job) => {
//               if (job?.category.toLowerCase() === 'digital marketing') {
//                 return <JobCard job={job} key={job.id}></JobCard>;
//               }
//               return null;
//             })
//            }
//           </div>
//         </TabPanel>
//       </div>
//     </Tabs>
//   )
// }

// export default TabCategories



/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJob = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-jobs`);
        if (response && response.data) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchAllJob();
  }, []);

  return (
    <div className="min-h-screen bg-[#17153B]">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-white capitalize lg:text-4xl">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-100">
          Explore jobs in Web Development, Graphics Design, and Digital Marketing. Choose a category to get started.
        </p>
        <Tabs>
        <div className="flex items-center justify-center my-8">
          <TabList className="flex gap-4">
            <Tab
              className="px-6 py-4 transition-all transform duration-300 text-sm font-medium text-gray-800 uppercase bg-gray-100 rounded-lg cursor-pointer hover:bg-purple-600 hover:text-white"
              selectedClassName="bg-purple-600 text-white"
            >
              Web Development
            </Tab>
            <Tab
              className="px-6 py-4 transition-all transform duration-300 text-sm font-medium text-gray-800 uppercase bg-gray-100 rounded-lg cursor-pointer hover:bg-purple-600 hover:text-white"
              selectedClassName="bg-purple-600 text-white"
            >
              Graphics Design
            </Tab>
            <Tab
              className="px-6 py-4 transition-all transform duration-300 text-sm font-medium text-gray-800 uppercase bg-gray-100 rounded-lg cursor-pointer hover:bg-purple-600 hover:text-white"
              selectedClassName="bg-purple-600 text-white"
            >
              Digital Marketing
            </Tab>
          </TabList>
        </div>

      
          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => {
                if (job?.category.toLowerCase() === 'web development') {
                  return <JobCard job={job} key={job.id} />;
                }
                return null;
              })}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => {
                if (job?.category.toLowerCase() === 'graphics design') {
                  return <JobCard job={job} key={job.id} />;
                }
                return null;
              })}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => {
                if (job?.category.toLowerCase() === 'digital marketing') {
                  return <JobCard job={job} key={job.id} />;
                }
                return null;
              })}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TabCategories;
