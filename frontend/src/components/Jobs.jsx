import React, { useEffect, useState } from 'react';
import Navbar from './ui/shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, selectedFilter } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (selectedFilter) {
      const latestJobIds = new Set(
        [...allJobs]
          .sort((firstJob, secondJob) => new Date(secondJob.createdAt) - new Date(firstJob.createdAt))
          .slice(0, 6)
          .map((job) => job._id)
      );
      const filteredJobs = allJobs.filter((job) => {
        const normalizedTitle = job.title?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
        const normalizedDescription = job.description?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
        const normalizedJobType = job.jobType?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
        const normalizedFilter = selectedFilter.toLowerCase().replace(/[^a-z0-9]/g, '');
        const salary = Number(job.salary);
        const experience = Number(job.experienceLevel ?? job.experience);
        const positions = Number(job.position);

        if (["Delhi", "Gurugram", "Noida", "Chennai", "Ahmedabad", "Bangalore", "Hyderabad", "Pune", "Mumbai"].includes(selectedFilter)) {
          return job.location?.toLowerCase() === selectedFilter.toLowerCase();
        }
        if (selectedFilter === "3-5 LPA") return salary >= 3 && salary <= 5;
        if (selectedFilter === "5-8 LPA") return salary > 5 && salary <= 8;
        if (selectedFilter === "9-12 LPA") return salary > 8 && salary <= 12;
        if (selectedFilter === "12-15 LPA") return salary > 12 && salary <= 15;
        if (selectedFilter === "15-20 LPA") return salary > 15 && salary <= 20;
        if (selectedFilter === "20-50 LPA") return salary > 20 && salary <= 50;
        if (selectedFilter === "50 LPA+") return salary >= 50;
        if (["Full Time", "Part Time", "Contract", "Internship", "Remote", "Hybrid", "Onsite"].includes(selectedFilter)) {
          return normalizedJobType.includes(normalizedFilter);
        }
        if (selectedFilter === "Fresher") return experience === 0;
        if (selectedFilter === "1-2 years") return experience >= 1 && experience <= 2;
        if (selectedFilter === "3-5 years") return experience >= 3 && experience <= 5;
        if (selectedFilter === "6-10 years") return experience >= 6 && experience <= 10;
        if (selectedFilter === "10+ years") return experience > 10;
        if (selectedFilter === "1-5 positions") return positions >= 1 && positions <= 5;
        if (selectedFilter === "6-10 positions") return positions >= 6 && positions <= 10;
        if (selectedFilter === "11-20 positions") return positions >= 11 && positions <= 20;
        if (selectedFilter === "20+ positions") return positions > 20;
        if (selectedFilter === "Latest Jobs") return latestJobIds.has(job._id);
        if (job.company?.name?.toLowerCase() === selectedFilter.toLowerCase()) return true;

        return normalizedTitle.includes(normalizedFilter) ||
          normalizedDescription.includes(normalizedFilter) ||
          normalizedJobType.includes(normalizedFilter);
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, selectedFilter]);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden text-[#FFDEDE]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Filter Sidebar */}
          <div className="w-full md:w-[20%] shrink-0 bg-[#FFDEDE] rounded-xl shadow-[0_4px_16px_rgba(207,15,71,0.18)] overflow-hidden">
            <FilterCard />
          </div>

          {/* Job Listings */}
          {filterJobs.length <= 0 ? (
            <span className="text-[#FF0B55] font-semibold">Job not found</span>
          ) : (
            <div className="w-full flex-1 md:h-[88vh] overflow-y-auto pb-5 scrollbar-thin scrollbar-thumb-[#CF0F47] scrollbar-track-black">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
