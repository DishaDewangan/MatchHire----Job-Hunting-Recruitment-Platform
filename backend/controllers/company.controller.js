import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId }).lean();
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        const companiesWithCounts = await Promise.all(companies.map(async (company) => {
          const jobs = await Job.find({ company: company._id }, { applications: 1 }).lean();
          return {
            ...company,
            jobCount: jobs.length,
            applicantCount: jobs.reduce((total, job) => total + (job.applications?.length || 0), 0)
          };
        }));

        return res.status(200).json({
          companies: companiesWithCounts,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ _id: companyId, userId: req.id });
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updateData = { name, description, website, location };
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      { _id: req.params.id, userId: req.id },
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      success: true
    });

  } catch (error) {
    console.log(error);
  }
};
