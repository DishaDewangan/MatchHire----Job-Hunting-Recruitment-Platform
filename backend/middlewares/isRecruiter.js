import { User } from "../models/user.model.js";

const isRecruiter = async (req, res, next) => {
    try {
        const user = await User.findById(req.id).select("role");
        if (!user || user.role !== "recruiter") {
            return res.status(403).json({
                message: "Recruiter access required.",
                success: false
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Unable to verify recruiter access.", success: false });
    }
};

export default isRecruiter;
