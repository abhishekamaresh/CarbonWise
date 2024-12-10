import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  UserCircle,
  Lightbulb,
  LogOut,
  Leaf,
} from "lucide-react";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../Atoms/userAtom";

export default function Sidebar() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserAtom);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    // Reset the UserAtom state
    setUser(null); // Reset user to null in the atom

    // Redirect to home page or login page
    navigate("/");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <LineChart size={20} />,
      label: "CFP Tracker",
      path: "/cfp-tracker",
    },
    {
      icon: <Lightbulb size={20} />,
      label: "CFP Optimizer",
      path: "/optimizer",
    },
    { icon: <UserCircle size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center p-4 border-b">
        <Leaf className="h-8 w-8 text-green-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">CarbonWise</span>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 w-full"
        >
          <LogOut size={20} />
          <span className="ml-3">Logout</span>
        </button>
      </nav>
    </div>
  );
}
