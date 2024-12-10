import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./Dashboard";
import CFPTracker from "./CFPTracker";
import Profile from "./Profile/index";
import CFPOptimizer from "./CFPOptimizer/index";
import ScrollToTop from "./components/ScrollToTop";
import { useRecoilValue } from "recoil";
import { UserAtom } from "./Atoms/userAtom";

function App() {
  const user = useRecoilValue(UserAtom); // Access user state
  const location = useLocation();

  // If user is not logged in and tries to access a protected route, redirect them to the landing page
  const isProtectedRoute = [
    "/dashboard",
    "/cfp-tracker",
    "/profile",
    "/charts",
    "/optimizer",
  ].includes(location.pathname);
  if (!user && isProtectedRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto">
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cfp-tracker" element={<CFPTracker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/optimizer" element={<CFPOptimizer />} />
      </Routes>
    </div>
  );
}

export default App;
