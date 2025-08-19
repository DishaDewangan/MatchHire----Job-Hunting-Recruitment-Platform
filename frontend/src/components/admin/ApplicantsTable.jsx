import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#FFDEDE] shadow-sm">
      <Table className="min-w-full text-sm">
        <TableCaption className="text-[#CF0F47] font-semibold">
          A list of your recent applied users
        </TableCaption>
        <TableHeader className="bg-[#FFDEDE]">
          <TableRow>
            <TableHead className="text-[#CF0F47] font-semibold">
              Full Name
            </TableHead>
            <TableHead className="text-[#CF0F47] font-semibold">Email</TableHead>
            <TableHead className="text-[#CF0F47] font-semibold">
              Contact
            </TableHead>
            <TableHead className="text-[#CF0F47] font-semibold">
              Resume
            </TableHead>
            <TableHead className="text-[#CF0F47] font-semibold">Date</TableHead>
            <TableHead className="text-right text-[#CF0F47] font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-[#FFF3F3] transition-colors"
              >
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant.createdAt.split('T')[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-[#CF0F47]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white shadow-lg border border-[#FFDEDE] rounded-lg">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer text-[#CF0F47] hover:text-white hover:bg-[#CF0F47] px-2 py-1 rounded transition-colors"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="text-center text-gray-500 py-6">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
