import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BriefcaseBusiness, Search } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          
          {/* Brand Info */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-[#CF0F47]">MatchHire</h2>
            <p className="text-sm text-gray-400">
                Find the right opportunity, build your next team, and move forward with confidence.
            </p>
              <p className="text-xs text-gray-500 mt-4">© 2024 MatchHire. All rights reserved.</p>
          </div>

          <div>
            <h3 className="font-semibold text-[#FFDEDE] mb-3">Explore</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/jobs" className="flex items-center gap-2 hover:text-[#FF0B55]"><Search size={15} /> Browse jobs</Link>
              <Link to="/saved-jobs" className="flex items-center gap-2 hover:text-[#FF0B55]"><Bookmark size={15} /> Saved jobs</Link>
              <Link to="/login" className="flex items-center gap-2 hover:text-[#FF0B55]"><BriefcaseBusiness size={15} /> Recruiter workspace</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#FFDEDE] mb-3">Built for momentum</h3>
            <p className="text-sm text-gray-400">Candidates discover better roles. Recruiters reach people ready for their next opportunity.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
