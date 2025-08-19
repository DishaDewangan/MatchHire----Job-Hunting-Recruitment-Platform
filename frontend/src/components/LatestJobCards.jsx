import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="
                bg-white/10 backdrop-blur-md border border-[#CF0F47]/30 
                rounded-2xl shadow-lg cursor-pointer
                hover:shadow-[#CF0F47]/50 hover:-translate-y-1 
                transition-all duration-300 p-6 flex flex-col justify-between
            "
        >
            {/* Top Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {job?.company?.logo && (
                            <img
                                src={job.company.logo}
                                alt={`${job.company.name} logo`}
                                className="w-10 h-10 object-contain bg-white p-1 rounded-md"
                            />
                        )}
                        <h2 className="text-lg font-bold text-white">{job?.company?.name}</h2>
                    </div>
                    <Badge className="bg-[#CF0F47] text-white rounded-full">{job?.jobType}</Badge>
                </div>
                <p className="text-sm text-gray-400">India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mt-4">
                <h3 className="text-xl font-extrabold text-[#FF0B55] mb-2">{job?.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">{job?.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
                <Badge className="bg-black text-white rounded-full">{job?.position} Positions</Badge>
                <Badge className="bg-[#FF0B55] text-white rounded-full">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
