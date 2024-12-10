import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import AuthRedirect from "../components/AuthRedirect";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../Atoms/userAtom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserAtom); // To update Recoil state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting to true
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { username, userId, email, token } = response.data;

        // Set the user data in sessionStorage
        sessionStorage.setItem(
          "user",
          JSON.stringify({ username, email, userId: userId })
        );
        sessionStorage.setItem("token", token);

        // Update Recoil state with the user data
        setUser({ username, email, userId: userId, token });

        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Ensure navigation only happens after the Snackbar has shown
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000); // Delay navigation to let Snackbar display
      } else {
        setSnackbarMessage(response?.data?.message || "Login failed.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-20 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <LogIn className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <CircularProgress
                        size={24}
                        color="inherit"
                        className="mr-2"
                      />
                      Signing In...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
          <AuthRedirect type="login" />
        </div>
      </div>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position at bottom center
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
