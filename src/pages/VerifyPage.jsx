// src/pages/VerifyPage.jsx

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    api
      .get(`/auth/verify?token=${token}`)
      .then(() => {
        setStatus("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      })
      .catch(() => {
        setStatus("Verification failed or token expired.");
      });
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Email Verification
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{status}</p>
      </div>
    </div>
  );
};

export default VerifyPage;
