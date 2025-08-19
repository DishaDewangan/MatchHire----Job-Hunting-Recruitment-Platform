import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const allAppliedJobs = useSelector((store) => store.job?.allAppliedJobs ?? []);
  
  console.log('Applied Jobs:', allAppliedJobs);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-gray-500">
                You haven't applied for any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob, idx) => {
              const key = appliedJob?._id ?? `applied-${idx}`;
              const rawStatus = appliedJob?.status ?? 'unknown';
              const status = String(rawStatus).toLowerCase();

              const statusClass =
                status === 'rejected' ? 'bg-red-400' :
                status === 'pending'  ? 'bg-gray-400' :
                status === 'unknown'  ? 'bg-yellow-400' :
                                       'bg-green-400';

              const date = appliedJob?.createdAt
                ? (typeof appliedJob.createdAt === 'string'
                    ? appliedJob.createdAt.split('T')[0]
                    : new Date(appliedJob.createdAt).toISOString().split('T')[0])
                : '-';

              return (
                <TableRow key={key}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{appliedJob?.job?.title ?? '-'}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name ?? '-'}</TableCell>
                  <TableCell className="text-right">
                    <span className={`${statusClass} text-white px-3 py-1 rounded-full`}>
                      {String(rawStatus).toUpperCase()}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
