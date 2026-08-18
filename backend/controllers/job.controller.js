import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || experience === undefined || experience === null || experience === "" || position === undefined || position === null || position === "" || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        
        const salaryNumber = Number(salary);
        const positionNumber = Number(position);
        const experienceNumber = Number(experience);

        if (!Number.isFinite(salaryNumber) || salaryNumber <= 0) {
            return res.status(400).json({
                message: "Salary must be a valid number.",
                success: false
            })
        };

        if (!Number.isFinite(positionNumber) || positionNumber < 1) {
            return res.status(400).json({
                message: "Position must be a valid number.",
                success: false
            })
        };

        if (!Number.isFinite(experienceNumber) || experienceNumber < 0) {
            return res.status(400).json({
                message: "Experience must be a valid number.",
                success: false
            })
        }
        
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: salaryNumber,
            location,
            jobType,
            experienceLevel: experienceNumber,
            position: positionNumber,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating job.",
            success: false
        })
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch jobs.",
            success: false
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch job.",
            success: false
        });
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs: jobs.map((job) => ({
                ...job.toObject(),
                applicantCount: job.applications?.length || 0
            })),
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch recruiter jobs.",
            success: false
        });
    }
}

export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const salaryNumber = Number(salary);
        const positionNumber = Number(position);
        const experienceNumber = Number(experience);

        if (!title || !description || !requirements || !salary || !location || !jobType || experience === undefined || experience === null || experience === "" || !position || !companyId) {
            return res.status(400).json({ message: "Something is missing.", success: false });
        }
        if (!Number.isFinite(salaryNumber) || salaryNumber <= 0 || !Number.isFinite(positionNumber) || positionNumber < 1 || !Number.isFinite(experienceNumber) || experienceNumber < 0) {
            return res.status(400).json({ message: "Salary, position, and experience must be valid numbers.", success: false });
        }

        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, created_by: req.id },
            {
                title,
                description,
                requirements: requirements.split(",").map(requirement => requirement.trim()),
                salary: salaryNumber,
                location,
                jobType,
                experienceLevel: experienceNumber,
                position: positionNumber,
                company: companyId
            },
            { new: true, runValidators: true }
        );

        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }
        return res.status(200).json({ message: "Job updated successfully.", job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating job.", success: false });
    }
}