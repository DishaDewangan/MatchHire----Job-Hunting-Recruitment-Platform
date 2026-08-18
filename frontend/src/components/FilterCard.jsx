import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilter } from '../../redux/jobSlice'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Gurugram", "Noida", "Chennai", "Ahmedabad", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Web Developer",
            "Data Scientist",
            "Machine Learning Engineer",
            "DevOps Engineer",
            "Mobile App Developer",
            "UI/UX Designer",
            "Product Manager",
            "QA Engineer",
            "Cybersecurity Analyst",
            "Business Analyst"
        ]
    },
    {
        fitlerType: "Salary",
        array: ["3-5 LPA", "5-8 LPA", "9-12 LPA", "12-15 LPA", "15-20 LPA", "20-50 LPA", "50 LPA+"]
    },
    {
        fitlerType: "Job Type",
        array: ["Full Time", "Part Time", "Contract", "Internship", "Remote", "Hybrid", "Onsite"]
    },
    {
        fitlerType: "Experience",
        array: ["Fresher", "1-2 years", "3-5 years", "6-10 years", "10+ years"]
    },
    {
        fitlerType: "Open Positions",
        array: ["1-5 positions", "6-10 positions", "11-20 positions", "20+ positions"]
    },
    {
        fitlerType: "Posting Date",
        array: ["Latest Jobs"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const { allJobs } = useSelector((store) => store.job);
    const companies = [...new Set(allJobs.map((job) => job.company?.name).filter(Boolean))];
    const filterData = [
        ...fitlerData,
        ...(companies.length > 0 ? [{ fitlerType: "Company", array: companies }] : [])
    ];

    const changeHandler = (value) => {
        setSelectedValue(value === 'all' ? '' : value);
    }

    useEffect(() => {
        dispatch(setSelectedFilter(selectedValue));
        return () => dispatch(setSelectedFilter(''));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full h-full bg-[#FFDEDE] p-4 rounded-lg">
            <h1 className="font-bold text-lg text-[#CF0F47]">Filter Jobs</h1>
            <hr className="mt-2 border-[#FF0B55]" />
            
            <div className="mt-4 space-y-4">
                {filterData.map((data) => (
                    <div key={data.fitlerType}>
                        <h1 className="font-semibold text-md text-black mb-2">{data.fitlerType}</h1>
                        <Select value={data.array.includes(selectedValue) ? selectedValue : ''} onValueChange={changeHandler}>
                            <SelectTrigger className="w-full border-gray-300 bg-white text-black shadow-none">
                                <SelectValue placeholder={`Select ${data.fitlerType}`} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All jobs</SelectItem>
                                {data.array.map((item) => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterCard
