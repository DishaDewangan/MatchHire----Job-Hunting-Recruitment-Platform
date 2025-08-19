import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="w-full bg-[#FFDEDE] border border-[#FF0B55] p-4 rounded-lg shadow-lg">
            <h1 className="font-bold text-lg text-[#CF0F47]">Filter Jobs</h1>
            <hr className="mt-2 border-[#FF0B55]" />
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="mt-3 space-y-4">
                {fitlerData.map((data, index) => (
                    <div key={index}>
                        <h1 className="font-semibold text-md text-black mb-2">{data.fitlerType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={idx} className="flex items-center space-x-2 my-2 p-2 rounded-md hover:bg-[#FFC1C1] transition-colors duration-200">
                                    <RadioGroupItem
                                        value={item}
                                        id={itemId}
                                        className="border-[#CF0F47] text-[#CF0F47] focus:ring-[#FF0B55]"
                                    />
                                    <Label htmlFor={itemId} className="text-gray-800">{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard
