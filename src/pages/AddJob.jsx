import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AuthContext } from '../providers/AuthProvider'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const AddJob = () => {

  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: '',
    deadline: new Date(),
    category: '',
    min_price: '',
    max_price: '',
    description: '',
    jobOwnerEmail: user?.email,
    jobOwnerName : user?.displayName,
    jobOwnerImageUrl : user?.photoURL,
    createdAt : new Date(),
    totalBid : 0,

  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'min_price' || name === 'max_price' ? parseFloat(value) || '' : value,
    }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      deadline: date,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const dataToSubmit = {
      ...formData,
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-job`, dataToSubmit);
        if(response.status == 200){
          Swal.fire({
            title: 'Success!',
            text: 'Job has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            position: 'top-center',
          });

        }
        navigate("/my-posted-jobs");
    } catch (error) {
        console.error('Error submitting job:', error);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
          position: 'top-center',
        });

    }

    setFormData({
      job_title: '',
      deadline: new Date(),
      category: '',
      min_price: '',
      max_price: '',
      description: '',
      jobOwnerEmail: user?.email,
      jobOwnerName : user?.displayName,
      jobOwnerImageUrl : user?.photoURL,
      createdAt : new Date(),
      totalBid : 0,
  
    })
    // console.log(dataToSubmit)
  }

  return (
    <div className='flex justify-center items-center min-h-screen py-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
      <section className='p-6 md:p-8 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl'>
        <h2 className='text-2xl font-bold text-gray-800 capitalize text-center mb-6'>
          POST A JOB
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 font-medium' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                type='text'
                value={formData.job_title}
                onChange={handleChange}
                placeholder='Enter job title'
                className='block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none'
              />
            </div>

            <div>
              <label className='text-gray-700 font-medium' htmlFor='email'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                name='jobOwnerEmail'
                defaultValue={formData.jobOwnerEmail}
                readOnly
                className='block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-gray-700 font-medium'>Deadline</label>
              <DatePicker
                className='border p-2 rounded-lg text-gray-800 bg-gray-100'
                selected={formData.deadline}
                onChange={handleDateChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-gray-700 font-medium' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                id='category'
                value={formData.category}
                onChange={handleChange}
                className='border p-2 rounded-lg text-gray-800 bg-gray-100'
              >
                <option value='' disabled>Select a category</option>
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>

            <div>
              <label className='text-gray-700 font-medium' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                type='number'
                value={formData.min_price}
                onChange={handleChange}
                placeholder='Enter minimum price'
                className='block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none'
              />
            </div>

            <div>
              <label className='text-gray-700 font-medium' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                type='number'
                value={formData.max_price}
                onChange={handleChange}
                placeholder='Enter maximum price'
                className='block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-gray-700 font-medium' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none'
              name='description'
              id='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter job description'
            ></textarea>
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='px-8 py-3 leading-5 text-white transition-colors duration-300 bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700'
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob
