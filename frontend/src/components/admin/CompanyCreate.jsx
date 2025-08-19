import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../../redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
        <div className="mb-10">
          <h1 className="font-bold text-2xl text-[#CF0F47]">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <Label className="text-gray-700 font-semibold">Company Name</Label>
        <Input
          type="text"
          className="my-2 border-[#FFB6B6] focus:border-[#CF0F47] focus:ring-[#CF0F47]"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-3 mt-10">
          <Button
            variant="outline"
            className="border-[#FFB6B6] text-[#CF0F47] hover:bg-[#FFDEDE]"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#CF0F47] hover:bg-[#b50d3d] text-white"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
