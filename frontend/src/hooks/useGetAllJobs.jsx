import { setAllJobs } from '../../redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const url = searchedQuery
                    ? `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`
                    : `${JOB_API_END_POINT}/get`;

                const res = await axios.get(url, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery]);
};

export default useGetAllJobs;
