import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Briefcase } from 'lucide-react'

const jobsData = [
  {
    id: 1,
    title: 'Plumber Needed',
    location: 'Mumbai, Maharashtra',
    description: 'Experienced plumber required for residential project. Must have own tools.',
    postedDate: '2023-06-15',
  },
  // Add more job listings here as needed
]

export default function JobsHomePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">RozgarSeva Jobs</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by title or location"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  )
}

function JobCard({ job }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{job.location}</span>
        </div>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Posted on {new Date(job.postedDate).toLocaleDateString()}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}