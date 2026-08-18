import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config();

const recruiters = [
  { name: "Aarav Mehta", email: "aarav.mehta32@gmail.com", phone: "9874621350", bio: "Technology recruiter building high-performing product teams." },
  { name: "Maya Sharma", email: "maya.sharma47@gmail.com", phone: "9127384650", bio: "Talent partner hiring for fast-growing digital businesses." },
  { name: "Kabir Khan", email: "kabir.khan81@gmail.com", phone: "9981542763", bio: "Recruiter focused on engineering, data, and security roles." }
];

const companyTemplates = [
  [
    { name: "Google", location: "Bangalore", description: "Technology company building search, cloud, and digital products.", roles: [["Frontend Developer", 18], ["Backend Developer", 24], ["Data Scientist", 30]] },
    { name: "Microsoft", location: "Hyderabad", description: "Global software and cloud services company.", roles: [["Full Stack Web Developer", 20], ["Cloud Engineer", 28], ["Product Manager", 32]] },
    { name: "TCS", location: "Pune", description: "IT services and consulting organization.", roles: [["Java Developer", 7], ["Business Analyst", 9], ["QA Engineer", 6]] },
    { name: "Infosys", location: "Bangalore", description: "Digital services and consulting company.", roles: [["Frontend Developer", 8], ["Backend Developer", 12], ["DevOps Engineer", 16]] }
  ],
  [
    { name: "Visa", location: "Bangalore", description: "Payments technology company connecting people and businesses.", roles: [["Backend Developer", 16], ["Security Engineer", 22], ["Data Scientist", 20]] },
    { name: "Deloitte", location: "Gurugram", description: "Professional services and technology consulting firm.", roles: [["Business Analyst", 10], ["Cloud Engineer", 18], ["Product Manager", 24]] },
    { name: "Juspay", location: "Mumbai", description: "Digital payments platform for secure transactions.", roles: [["Full Stack Web Developer", 12], ["QA Engineer", 8], ["Cybersecurity Analyst", 15]] },
    { name: "Accenture", location: "Chennai", description: "Technology and business transformation services company.", roles: [["Machine Learning Engineer", 18], ["DevOps Engineer", 20], ["UX Designer", 9]] }
  ],
  [
    { name: "Cognizant", location: "Chennai", description: "Professional technology and digital engineering services company.", roles: [["Backend Developer", 11], ["Data Scientist", 17], ["QA Engineer", 7]] },
    { name: "Zomato", location: "Gurugram", description: "Food delivery and restaurant technology platform.", roles: [["Mobile App Developer", 14], ["Frontend Developer", 12], ["Product Manager", 22]] },
    { name: "Swiggy", location: "Bangalore", description: "Consumer internet and on-demand delivery platform.", roles: [["Full Stack Web Developer", 15], ["Machine Learning Engineer", 21], ["UI/UX Designer", 8]] },
    { name: "Wipro", location: "Noida", description: "IT consulting and technology services company.", roles: [["Cloud Engineer", 13], ["Cybersecurity Analyst", 16], ["Business Analyst", 8]] },
    { name: "PayPal", location: "Chennai", description: "Global digital payments and financial technology company.", roles: [["Backend Developer", 18], ["Full Stack Web Developer", 22], ["Data Scientist", 25], ["Security Engineer", 20], ["Product Manager", 28], ["QA Engineer", 12]] }
  ]
];

const students = [
  { name: "Ishita Verma", email: "ishita.verma26@gmail.com", phone: "9348172650", skills: ["React", "JavaScript", "CSS"], bio: "Frontend developer passionate about accessible interfaces." },
  { name: "Rohan Patel", email: "rohan.patel64@gmail.com", phone: "9762451830", skills: ["Node.js", "Express", "MongoDB"], bio: "Backend developer interested in scalable APIs." },
  { name: "Nisha Rao", email: "nisha.rao19@gmail.com", phone: "9185637420", skills: ["Python", "Pandas", "Machine Learning"], bio: "Data enthusiast who enjoys turning data into decisions." },
  { name: "Aditya Singh", email: "aditya.singh73@gmail.com", phone: "9893215476", skills: ["AWS", "Docker", "Kubernetes"], bio: "Cloud and DevOps learner building reliable deployments." },
  { name: "Meera Iyer", email: "meera.iyer45@gmail.com", phone: "9274185630", skills: ["Figma", "User Research", "Prototyping"], bio: "UX designer focused on simple and useful products." },
  { name: "Vikram Joshi", email: "vikram.joshi88@gmail.com", phone: "9657382140", skills: ["Java", "Spring Boot", "SQL"], bio: "Software engineer building dependable business systems." }
];

const getDemoPassword = (user) => `${user.name.split(" ")[0]}${user.email.match(/\d+/)?.[0] || ""}`;

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const seedEmails = [...recruiters, ...students].map((user) => user.email);
  const legacyEmails = [
    "aarav.mehta@gmail.com", "maya.sharma@gmail.com", "kabir.khan@gmail.com",
    "ishita.verma@gmail.com", "rohan.patel@gmail.com", "nisha.rao@gmail.com",
    "aditya.singh@gmail.com", "meera.iyer@gmail.com", "vikram.joshi@gmail.com",
    "aarav.mehta@example.com", "maya.sharma@example.com", "kabir.khan@example.com",
    "ishita.verma@example.com", "rohan.patel@example.com", "nisha.rao@example.com",
    "aditya.singh@example.com", "meera.iyer@example.com", "vikram.joshi@example.com",
    "demo-recruiter1@example.com", "demo-recruiter2@example.com", "demo-recruiter3@example.com",
    "demo-candidate1@example.com", "demo-candidate2@example.com", "demo-candidate3@example.com",
    "demo-candidate4@example.com", "demo-candidate5@example.com", "demo-candidate6@example.com"
  ];
  const oldUsers = await User.find({ email: { $in: [...seedEmails, ...legacyEmails] } }, { _id: 1 });
  const oldUserIds = oldUsers.map((user) => user._id);
  const seededCompanyNames = companyTemplates.flat().map((company) => company.name);
  const oldCompanies = await Company.find({ $or: [{ name: /^Demo/ }, { name: { $in: [...seededCompanyNames, "USPay"] } }] }, { _id: 1 });
  const oldCompanyIds = oldCompanies.map((company) => company._id);

  await Job.deleteMany({ $or: [{ created_by: { $in: oldUserIds } }, { company: { $in: oldCompanyIds } }] });
  await Company.deleteMany({ $or: [{ name: /^Demo/ }, { name: { $in: [...seededCompanyNames, "USPay"] } }] });
  await User.deleteMany({ email: { $in: [...seedEmails, ...legacyEmails] } });

  const recruiterDocs = await User.insertMany(await Promise.all(recruiters.map(async (user) => ({
    fullname: user.name,
    email: user.email,
    phoneNumber: Number(user.phone),
    password: await bcrypt.hash(getDemoPassword(user), 10),
    role: "recruiter",
    profile: { bio: user.bio, skills: [] }
  }))));

  const studentDocs = await User.insertMany(await Promise.all(students.map(async (user) => ({
    fullname: user.name,
    email: user.email,
    phoneNumber: Number(user.phone),
    password: await bcrypt.hash(getDemoPassword(user), 10),
    role: "student",
    profile: { bio: user.bio, skills: user.skills }
  }))));

  const companyDocs = [];
  const jobDocs = [];
  companyTemplates.forEach((recruiterCompanies, recruiterIndex) => {
    recruiterCompanies.forEach((template) => {
      const company = new Company({
        name: template.name,
        description: template.description,
        website: `https://${template.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.example.com`,
        location: template.location,
        logo: "",
        userId: recruiterDocs[recruiterIndex]._id
      });
      companyDocs.push(company);
      template.roles.forEach(([title, salary], roleIndex) => {
        jobDocs.push({
          title,
          description: `${template.name} is hiring a ${title} to build and improve high-quality products.`,
          requirements: ["Strong communication", "Relevant project experience", "Problem solving"],
          salary,
          location: template.location,
          jobType: roleIndex === 1 ? "Hybrid" : "Full-time",
          experienceLevel: roleIndex === 0 ? 1 : roleIndex + 2,
          position: roleIndex + 2,
          company: company._id,
          created_by: recruiterDocs[recruiterIndex]._id
        });
      });
    });
  });

  const filterCoverageJobs = [
    ["Frontend Developer", 4, "Delhi", "Full Time", 0, 1, "TCS"],
    ["Backend Developer", 6, "Gurugram", "Part Time", 1, 6, "Wipro"],
    ["Full Stack Web Developer", 10, "Noida", "Contract", 3, 11, "Cognizant"],
    ["Data Scientist", 13, "Chennai", "Internship", 6, 21, "Accenture"],
    ["Machine Learning Engineer", 17, "Ahmedabad", "Remote", 11, 2, "Infosys"],
    ["DevOps Engineer", 25, "Bangalore", "Hybrid", 2, 8, "Google"],
    ["Mobile App Developer", 55, "Hyderabad", "Onsite", 4, 15, "Microsoft"],
    ["UI/UX Designer", 5, "Pune", "Full Time", 0, 3, "Wipro"],
    ["Product Manager", 8, "Mumbai", "Part Time", 1, 5, "TCS"],
    ["QA Engineer", 12, "Delhi", "Contract", 3, 10, "Cognizant"],
    ["Cybersecurity Analyst", 20, "Gurugram", "Remote", 6, 20, "Visa"],
    ["Business Analyst", 50, "Noida", "Hybrid", 11, 4, "PayPal"]
  ];

  filterCoverageJobs.forEach(([title, salary, location, jobType, experienceLevel, position, companyName]) => {
    const company = companyDocs.find((companyDoc) => companyDoc.name === companyName);
    jobDocs.push({
      title,
      description: `${company.name} is hiring a ${title} for its growing technology team.`,
      requirements: ["Strong communication", "Relevant project experience", "Problem solving"],
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company: company._id,
      created_by: company.userId
    });
  });

  const massRecruiterPositions = {
    TCS: 80,
    Wipro: 70,
    Cognizant: 60,
    Infosys: 55,
    Accenture: 45
  };
  jobDocs.forEach((job) => {
    const company = companyDocs.find((companyDoc) => String(companyDoc._id) === String(job.company));
    if (company && massRecruiterPositions[company.name]) {
      job.position = massRecruiterPositions[company.name];
    }
  });

  await Company.insertMany(companyDocs);
  await Job.insertMany(jobDocs);
  console.log(JSON.stringify({
    recruiters: recruiterDocs.length,
    companies: companyDocs.length,
    jobs: jobDocs.length,
    students: studentDocs.length,
    credentials: [...recruiters, ...students].map((user) => ({
      email: user.email,
      password: getDemoPassword(user)
    })),
    recruiterEmails: recruiters.map((user) => user.email),
    studentEmails: students.map((user) => user.email)
  }, null, 2));
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
