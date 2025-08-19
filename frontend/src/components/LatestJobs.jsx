import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="bg-[#000000] py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                    <span className="text-[#CF0F47]">Latest & Top</span> Job Openings
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                    Browse through the latest opportunities handpicked just for you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allJobs.length <= 0 
                        ? <span className="text-gray-500">No Job Available</span> 
                        : allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestJobs;
