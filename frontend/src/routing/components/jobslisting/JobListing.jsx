import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Briefcase, User, FileText, Phone, MapPin, Tag } from 'lucide-react';

const JobListingForm = () => {
  const [jobData, setJobData] = useState({
    projectName: '',
    projectOwnerName: '',
    jobDescription: '',
    phoneNo: '',
    address: '',
    pincode:"",
    category: '',
    
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You need to be logged in to post a job.');
      return;
    }

    try {
      const response = await axios.post(
        'https://rozgarseva.onrender.com/api/jobs',
        jobData,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      setMessage('Job posted successfully!');
      
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setMessage(error.response ? error.response.data : 'Something went wrong!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      >
        <div className="p-8">
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="text-3xl font-bold text-center text-gray-900 mb-6"
          >
            Post a Job
          </motion.h2>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm font-medium text-orange-600 mb-4"
            >
              {message}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={<Briefcase className="h-5 w-5 text-gray-400" />}
              label="Project Name"
              name="projectName"
              value={jobData.projectName}
              onChange={handleChange}
            />

            <InputField
              icon={<User className="h-5 w-5 text-gray-400" />}
              label="Project Owner Name"
              name="projectOwnerName"
              value={jobData.projectOwnerName}
              onChange={handleChange}
            />

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="jobDescription"
                  id="jobDescription"
                  value={jobData.jobDescription}
                  onChange={handleChange}
                  required
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  rows={4}
                />
              </div>
            </div>

            <InputField
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              label="Phone Number"
              name="phoneNo"
              value={jobData.phoneNo}
              onChange={handleChange}
            />

            <InputField
              icon={<MapPin className="h-5 w-5 text-gray-400" />}
              label="Address"
              name="address"
              value={jobData.address}
              onChange={handleChange}
            />

            <InputField
              icon={<MapPin className="h-5 w-5 text-gray-400" />}
              label="Pincode"
              name="pincode"
            
              value={jobData.pincode}
              onChange={handleChange}
            />

            <InputField
              icon={<Tag className="h-5 w-5 text-gray-400" />}
              label="Category"
              name="category"
              value={jobData.category}
              onChange={handleChange}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Post Job
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InputField = ({ icon, label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <motion.input
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>
);

export default JobListingForm;