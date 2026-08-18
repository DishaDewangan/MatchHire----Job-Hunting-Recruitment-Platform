import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/shared/Navbar';
import Job from './Job';
import { Button } from './ui/button';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(storedJobs);
  }, []);

  const clearSavedJobs = () => {
    localStorage.removeItem('savedJobs');
    setSavedJobs([]);
  };

  return (
    <div className="min-h-screen bg-[#FFF7F7]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#CF0F47]">Saved Jobs</h1>
            <p className="text-gray-600 mt-1">
              {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved for later
            </p>
          </div>
          {savedJobs.length > 0 && (
            <Button
              onClick={clearSavedJobs}
              variant="outline"
              className="border-[#CF0F47] text-[#CF0F47] hover:bg-[#CF0F47] hover:text-white"
            >
              Clear All
            </Button>
          )}
        </div>

        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <Job
                key={job._id}
                job={job}
                onSavedChange={(jobs) => setSavedJobs(jobs)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white border border-[#FFB6B6] rounded-xl p-12 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">No saved jobs yet</h2>
            <p className="text-gray-600 mt-2">Save interesting jobs and find them here later.</p>
            <Button
              onClick={() => navigate('/jobs')}
              className="mt-6 bg-[#CF0F47] hover:bg-[#FF0B55] text-white"
            >
              Browse Jobs
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedJobs;
