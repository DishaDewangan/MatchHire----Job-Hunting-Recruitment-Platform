import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '../../redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className="max-w-7xl mx-auto my-10 bg-[#FFDEDE] rounded-xl p-6 shadow-lg border border-[#FFB6B6]">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="font-bold text-2xl text-[#CF0F47]">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <Badge className="text-[#0B5DFF] font-bold bg-white border border-[#0B5DFF]" variant="ghost">
                            {singleJob?.postion} Positions
                        </Badge>
                        <Badge className="text-[#F83002] font-bold bg-white border border-[#F83002]" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold bg-white border border-[#7209b7]" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-6 py-2 text-white font-semibold shadow-md transition-all duration-200 
                        ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className="border-b-2 border-[#FFB6B6] font-semibold py-4 mt-6 text-[#333]">Job Description</h1>

            <div className="my-4 space-y-2 text-[#444]">
                <h1><span className="font-bold">Role:</span> <span className="pl-4">{singleJob?.title}</span></h1>
                <h1><span className="font-bold">Location:</span> <span className="pl-4">{singleJob?.location}</span></h1>
                <h1><span className="font-bold">Description:</span> <span className="pl-4">{singleJob?.description}</span></h1>
                <h1><span className="font-bold">Experience:</span> <span className="pl-4">{singleJob?.experience} yrs</span></h1>
                <h1><span className="font-bold">Salary:</span> <span className="pl-4">{singleJob?.salary} LPA</span></h1>
                <h1><span className="font-bold">Total Applicants:</span> <span className="pl-4">{singleJob?.applications?.length}</span></h1>
                <h1><span className="font-bold">Posted Date:</span> <span className="pl-4">{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
