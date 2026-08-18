import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    useGetAllCompanies();

    const { companies } = useSelector(store => store.company);

    useEffect(() => {
        if (!id) return;

        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
                const job = res.data.job;
                setInput({
                    title: job.title || '',
                    description: job.description || '',
                    requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : '',
                    salary: job.salary ?? '',
                    location: job.location || '',
                    jobType: job.jobType || '',
                    experience: job.experienceLevel ?? '',
                    position: job.position ?? '',
                    companyId: job.company?._id || job.company || ''
                });
            } catch (error) {
                toast.error(error.response?.data?.message || 'Unable to load job.');
                navigate('/admin/jobs');
            }
        };
        fetchJob();
    }, [id, navigate]);
    const changeEventHandler = (e) => {
        const { name, value } = e.target;

        if (name === "salary" || name === "experience" || name === "position") {
            if (value === "") {
                setInput({ ...input, [name]: "" });
                return;
            }

            const numericValue = Number(value);
            if (!Number.isFinite(numericValue)) {
                return;
            }

            setInput({ ...input, [name]: numericValue });
            return;
        }

        setInput({ ...input, [name]: value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        if (!selectedCompany) return;
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const salaryNumber = Number(input.salary);
        const positionNumber = Number(input.position);
        const experienceNumber = Number(input.experience);

        if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || input.experience === "" || !input.position || !input.companyId) {
            toast.error("Please fill in all job fields before submitting.");
            return;
        }

        if (!Number.isFinite(salaryNumber) || salaryNumber <= 0) {
            toast.error("Salary must be a valid positive number.");
            return;
        }

        if (!Number.isFinite(positionNumber) || positionNumber < 1) {
            toast.error("Position count must be at least 1.");
            return;
        }

        if (!Number.isFinite(experienceNumber) || experienceNumber < 0) {
            toast.error("Experience must be a valid number.");
            return;
        }

        const payload = {
            ...input,
            salary: salaryNumber,
            position: positionNumber,
            experience: experienceNumber,
        };

        try {
            setLoading(true);
            const res = await axios({
                method: isEditMode ? 'put' : 'post',
                url: isEditMode ? `${JOB_API_END_POINT}/update/${id}` : `${JOB_API_END_POINT}/post`,
                data: payload,
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit = {submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary (LPA)</Label>
                            <Input
                                type="number"
                                min="0"
                                step="0.1"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="e.g. 5"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                min="0"
                                step="1"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                min="1"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div> 
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">{isEditMode ? 'Update Job' : 'Post New Job'}</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob