import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Users, Edit, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function JobListingCard({ job, index, userId }) {


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="bg-white shadow-md rounded-lg p-6 mb-4 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300"
    >
      <motion.h2
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl font-bold mb-2 text-orange-600"
      >
        {job.projectName}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-sm text-gray-500 mb-2"
      >
        <p className="text-gray-600 mb-2 flex items-center">
          <User className="mr-2 h-4 w-4 text-orange-500" />
          {job.projectOwnerName}
        </p>
        <p className="flex items-center mb-1">
          <MapPin className="mr-2 h-4 w-4 text-orange-500" />
          {job.address}
        </p>
        <p className="flex items-center mb-1">
          <Briefcase className="mr-2 h-4 w-4 text-orange-500" />
          {job.jobDescription}
        </p>
        <p className="flex items-center mb-1">
          <Calendar className="mr-2 h-4 w-4 text-orange-500" />
          Posted on: {new Date(job.postedDate).toLocaleDateString()}
        </p>
        <p className="flex items-center">
          <Users className="mr-2 h-4 w-4 text-orange-500" />
          Category: {job.category}
        </p>
      </motion.div>
      <motion.div
        className="flex justify-end space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Link to={`/jobs/${job._id}/edit`}><motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "#c2410c" }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center"
        >
          <Edit className="mr-2 h-4 w-4" />
          View or Edit
        </motion.button></Link>
      </motion.div>
    </motion.div>
  );
}

export default function UserJobListings() {
  const [userId, setUserId] = useState();
  const [jobs, setJob] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
    }
  }, []);

  useEffect(() => {
    const getUserJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/jobs/${userId}`);
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (userId) {
      getUserJobs();
    }
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200"
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white shadow-md py-6 mb-8"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-orange-600 text-center">Your Job Listings</h1>
        </div>
      </motion.header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {jobs.map((job, index) => (
            <JobListingCard key={job._id} job={job} index={index} userId={userId} />
          ))}
        </motion.div>
        {jobs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-gray-600 mt-8"
          >
            You haven't posted any job listings yet.
          </motion.p>
        )}
      </main>
    </motion.div>
  );
}