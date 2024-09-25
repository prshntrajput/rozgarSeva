import React, { useState } from 'react';

// Mock data for initial job listings
const initialJobListings = [
  {
    id: 1,
    title: 'Plumber Needed',
    description: 'Experienced plumber required for residential project',
    location: 'Mumbai, Maharashtra',
    salary: '₹500 per hour',
    postedDate: '2023-06-15',
    applicants: 5,
  },
  {
    id: 2,
    title: 'House Cleaning Service',
    description: 'Looking for a reliable house cleaning service',
    location: 'Delhi, NCR',
    salary: '₹300 per hour',
    postedDate: '2023-06-10',
    applicants: 3,
  },
];

function JobListingCard({ job, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border-l-4 border-orange-500">
      <h2 className="text-xl font-bold mb-2 text-orange-600">{job.title}</h2>
      <p className="text-gray-600 mb-2">{job.description}</p>
      <div className="text-sm text-gray-500 mb-2">
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p>Posted on: {job.postedDate}</p>
        <p>Applicants: {job.applicants}</p>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(job.id)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function UserJobListings() {
  const [jobListings, setJobListings] = useState(initialJobListings);

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log('Edit job with id:', id);
  };

  const handleDelete = (id) => {
    setJobListings(jobListings.filter(job => job.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-50">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Your Job Listings</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobListings.map(job => (
          <JobListingCard
            key={job.id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {jobListings.length === 0 && (
        <p className="text-center text-gray-600">You haven't posted any job listings yet.</p>
      )}
    </div>
  );
}