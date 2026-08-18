import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import https from "https";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Helper: Test if a URL is publicly accessible
const isUrlAccessible = (url) => {
  return new Promise((resolve) => {
    https.head(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 300);
    }).on('error', () => {
      resolve(false);
    });
  });
};

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        //  console.log(fullname, email, phoneNumber, password, role);
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Handle profile photo - optional, only upload if file is provided
        let profilePhoto = "";
        const file = req.file;
        if (file) {
          const safeFilename = file.originalname.replace(/\s+/g, '_');
          try {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
          } catch (uploadError) {
            const uploadDirectory = path.resolve("uploads", "profile-photos");
            await fs.mkdir(uploadDirectory, { recursive: true });
            const localFilename = `${randomUUID()}-${safeFilename}`;
            await fs.writeFile(path.join(uploadDirectory, localFilename), file.buffer);
            profilePhoto = `${req.protocol}://${req.get("host")}/uploads/profile-photos/${encodeURIComponent(localFilename)}`;
          }
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: profilePhoto,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error during registration.",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
//         // // cloudinary ayega idhar
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
// // resume comes later here...
// if (cloudResponse) {
//     user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
//     user.profile.resumeOriginalName = file.originalname; // Save the original file name
// }

//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // middleware authentication
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }
//         // updating data
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray
      
//         // // resume comes later here...
//         // if(cloudResponse){
//         //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url
//         //     user.profile.resumeOriginalName = file.originalname // Save the original file name
//         // }

//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully.",
//             user,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id; // From auth middleware

    // ✅ First, find the user
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }

    const file = user.role === "student" ? req.files?.file?.[0] : null;
    const profilePhoto = req.files?.profilePhoto?.[0];

    // ✅ Prepare updated values
    if (fullname !== undefined) user.fullname = fullname;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    if (!user.profile) user.profile = {};
    if (bio !== undefined) user.profile.bio = bio;
    if (user.role === "student" && skills !== undefined) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      user.profile.skills = skillsArray;
    }

    if (profilePhoto) {
      const photoFilename = profilePhoto.originalname.replace(/\s+/g, '_');
      const photoPublicId = `${path.parse(photoFilename).name}-${randomUUID()}`;
      try {
        const cloudResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "profile-photos",
              public_id: photoPublicId
            },
            (error, result) => error ? reject(error) : resolve(result)
          );
          uploadStream.end(profilePhoto.buffer);
        });
        user.profile.profilePhoto = cloudResponse.secure_url;
      } catch (uploadError) {
        const uploadDirectory = path.resolve("uploads", "profile-photos");
        await fs.mkdir(uploadDirectory, { recursive: true });
        const localFilename = `${randomUUID()}-${photoFilename}`;
        await fs.writeFile(path.join(uploadDirectory, localFilename), profilePhoto.buffer);
        user.profile.profilePhoto = `${req.protocol}://${req.get("host")}/uploads/profile-photos/${encodeURIComponent(localFilename)}`;
      }
    }

    // ✅ If file is uploaded, process with Cloudinary
    if (file) {
      const safeFilename = file.originalname.replace(/\s+/g, '_');
      const publicId = path.parse(safeFilename).name;

      // Keep the original extension so the browser saves the file as a PDF
      try {
        const cloudResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "resumes",
              public_id: publicId,
              format: "pdf",
              type: "upload"
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          uploadStream.end(file.buffer);
        });

        // Test if the Cloudinary URL is publicly accessible
        const resumeUrl = `${cloudResponse.secure_url}?fl_attachment=false`;
        const isAccessible = await isUrlAccessible(resumeUrl);
        
        if (isAccessible) {
          user.profile.resume = resumeUrl;
        } else {
          // Cloudinary delivered the file but it's not publicly accessible; fall back to local
          throw new Error("Cloudinary URL not publicly accessible");
        }
      } catch (uploadError) {
        // Keep local development usable; fall back to local storage on any error
        const uploadDirectory = path.resolve("uploads", "resumes");
        await fs.mkdir(uploadDirectory, { recursive: true });
        const localFilename = `${randomUUID()}-${safeFilename}`;
        await fs.writeFile(path.join(uploadDirectory, localFilename), file.buffer);
        user.profile.resume = `${req.protocol}://${req.get("host")}/uploads/resumes/${encodeURIComponent(localFilename)}`;
      }
      user.profile.resumeOriginalName = file.originalname;
    }


    await user.save();

    // ✅ Filtered response
    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: safeUser,
      success: true
    });

  } catch (error) {
    console.log("Update Profile Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
