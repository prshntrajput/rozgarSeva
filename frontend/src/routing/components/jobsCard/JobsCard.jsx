import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ChevronRight, Briefcase, CircleUserRound, User  } from 'lucide-react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { asyncgetJobs } from '../../../store/actions/JobAction/JobAction';

/**const jobsData = [
  {
    id: 1,
    title: 'Plumber Needed',
    location: 'Mumbai, Maharashtra',
    description: 'Experienced plumber required for residential project. Must have own tools.',
    postedDate: '2023-06-15',
    category: 'Plumbing',
  },
  {
    id: 2,
    title: 'Electrician Wanted',
    location: 'Delhi, NCR',
    description: 'Skilled electrician needed for commercial wiring project. 5+ years experience required.',
    postedDate: '2023-06-18',
    category: 'Electrical',
  },
  {
    id: 3,
    title: 'Carpenter for Furniture Assembly',
    location: 'Bangalore, Karnataka',
    description: 'Experienced carpenter needed for custom furniture assembly. Attention to detail is crucial.',
    postedDate: '2023-06-20',
    category: 'Carpentry',
  },
]**/

const JobsHomePage = () => {
 

  const [jobData,setJobData]= useState([]);

  const { jobs } = useSelector((state)=> state.JobReducer)
  const dispatch = useDispatch();
  
  
  {/**useEffect(()=>{
    const jobList= async ()=>{
    try {
      const response = await axios.get("http://localhost:8080/api/jobs");
      setJobData(response.data)
      
      
    } catch (error) {
      console.log(error.message)
    }}
    jobList();
  },[]);
**/}

  useEffect(()=>{
    dispatch(asyncgetJobs());
  })

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-gray-800 mb-12"
      >
        Exciting Job Opportunities
      </motion.h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </div>
    </div>
  )
}

const JobCard = ({ job, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-4"
        >
          <span className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
            {job.category}
          </span>
          <motion.span 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-orange-500"
          >
            <Briefcase size={20} />
          </motion.span>
        </motion.div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{job.projectName}</h2>
        <p className="text-gray-600 mb-2 flex items-center">
          <User className="mr-2 h-4 w-4 text-orange-500" />
          {job.projectOwnerName}
        </p>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1 text-orange-500" />
          <span className="text-sm">{job.address}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <CircleUserRound  className="h-4 w-4 mr-1 text-orange-500" />
          <span className="text-xs">Contact : {job.phoneNo}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{job.jobDescription}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1 text-orange-500" />
          <span className="text-xs">Posted on {new Date(job.datePosted).toLocaleDateString()}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center group"
        >
          Apply Now
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: 5 }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
          >
            <ChevronRight className="ml-2 h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default JobsHomePage;