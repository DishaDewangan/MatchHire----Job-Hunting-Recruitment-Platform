import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-[#000000] text-white py-16 text-center">
            <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
                
                {/* Tagline */}
                <span className="mx-auto px-6 py-2 rounded-full bg-[#FFDEDE] text-[#CF0F47] font-medium shadow-md">
                    No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-5xl font-extrabold leading-tight">
                    Search, Apply & <br /> 
                    Get Your <span className="text-[#FF0B55]">Dream Jobs</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Find the perfect role that matches your skills and passion. 
                    Apply with confidence and take the next step in your career.
                </p>

                {/* Search bar */}
                <div className="flex w-full sm:w-[60%] mx-auto shadow-lg border border-[#FF0B55] rounded-full overflow-hidden bg-[#1a1a1a]">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full px-4 py-3 bg-transparent text-white placeholder-gray-400"
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-none bg-[#CF0F47] hover:bg-[#FF0B55] transition-colors px-6"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
