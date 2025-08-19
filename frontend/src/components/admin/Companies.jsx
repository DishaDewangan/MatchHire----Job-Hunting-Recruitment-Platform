import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../../redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-[#FFDEDE]">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Search + New Company Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-5 bg-white p-4 rounded-xl shadow-md">
          <Input
            className="w-full md:w-1/2 border-2 border-[#FFB6B6] rounded-lg focus:border-[#CF0F47] focus:ring-2 focus:ring-[#CF0F47] transition-all"
            placeholder="🔍 Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-[#CF0F47] hover:bg-[#a80c38] text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            ➕ New Company
          </Button>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
