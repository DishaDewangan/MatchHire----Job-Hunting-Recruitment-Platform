import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "../../../../redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-[#000000] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-[#FF0B55]">
          Match<span className="text-[#CF0F47]">Hire</span>
        </Link>

        {/* Navigation links */}
        <ul className="flex gap-8 text-[#FFDEDE] font-semibold text-lg">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link
                  to="/admin/companies"
                  className="hover:text-[#FF0B55] transition-colors duration-300"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className="hover:text-[#FF0B55] transition-colors duration-300"
                >
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-[#FF0B55] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="hover:text-[#FF0B55] transition-colors duration-300"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="hover:text-[#FF0B55] transition-colors duration-300"
                >
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Auth Buttons or User Avatar */}
        {!user ? (
          <div className="flex gap-4">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-[#FF0B55] text-[#FF0B55] hover:bg-[#FF0B55] hover:text-white transition"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#CF0F47] hover:bg-[#FF0B55] text-white transition">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-[#FF0B55]">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User"}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-[#FFDEDE] text-[#000000]">
              <div className="flex gap-4 space-y-2">
                <Avatar className="cursor-pointer ring-2 ring-[#CF0F47]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{user?.fullname}</h4>
                  <p className="text-sm text-[#6427ff]">
                    {user?.profile?.bio || "No bio provided."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col my-4 text-[#000000] space-y-3">
                {user && user.role === "student" && (
                  <div className="flex items-center gap-2 cursor-pointer text-[#CF0F47] hover:text-[#FF0B55] transition">
                    <User2 />
                    <Button variant="link" className="text-[#CF0F47] hover:text-[#FF0B55]">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 cursor-pointer text-[#CF0F47] hover:text-[#FF0B55] transition">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link" className="text-[#CF0F47] hover:text-[#FF0B55]">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
