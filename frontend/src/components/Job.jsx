import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Check if this job is already saved when component loads
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSaved(savedJobs.some(savedJob => savedJob._id === job._id));
  }, [job._id]);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const handleSaveJob = () => {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

    if (saved) {
      // Remove job if already saved
      savedJobs = savedJobs.filter(savedJob => savedJob._id !== job._id);
      setSaved(false);
    } else {
      // Add job to saved list
      savedJobs.push(job);
      setSaved(true);
    }

    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#CF0F47] shadow-[0_0_10px_#FF0B55] rounded-xl p-5 flex flex-col justify-between h-full hover:shadow-[0_0_20px_#FF0B55] transition-all duration-300">
      {/* Date + Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#FFDEDE]">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          onClick={handleSaveJob}
          variant="outline"
          className={`rounded-full border-[#FF0B55] ${saved ? 'bg-[#CF0F47] text-white' : 'text-[#FF0B55]'} hover:bg-[#CF0F47]/20`}
          size="icon"
        >
          <Bookmark fill={saved ? '#fff' : 'none'} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mt-6">
        <div className="p-3 bg-black rounded-full border border-[#CF0F47] shadow-sm">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h1 className="font-semibold text-lg text-[#FFDEDE]">{job?.company?.name}</h1>
          <p className="text-[#FF9F9F] text-sm">{job?.location || 'India'}</p>
        </div>
      </div>

      {/* Job Title + Description */}
      <div className="mt-4">
        <h1 className="font-bold text-lg text-[#FFDEDE]">{job?.title}</h1>
        <p className="text-sm text-[#FFBABA]">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-black text-[#FFDEDE] font-semibold border border-[#FF0B55]" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-black text-[#F83002] font-semibold border border-[#CF0F47]" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-black text-[#B5179E] font-semibold border border-[#7209B7]" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="bg-black text-[#FFDEDE] border border-[#CF0F47] hover:bg-[#CF0F47]/20"
          variant="outline"
        >
          Details
        </Button>
        <Button
          onClick={handleSaveJob}
          className={`${saved ? 'bg-green-600' : 'bg-[#CF0F47]'} text-white hover:bg-[#FF0B55]`}
        >
          {saved ? 'Saved' : 'Save For Later'}
        </Button>
      </div>
    </div>
  );
};

export default Job;
