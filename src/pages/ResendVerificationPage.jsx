// src/pages/ResendVerificationPage.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

const ResendVerificationPage = () => {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!email) {
      setStatus("Invalid email for resending verification.");
      return;
    }

    api
      .post("/auth/resend-verification", { email })
      .then(() => setStatus("✅ Verification email sent successfully!"))
      .catch(() => setStatus("❌ Failed to send verification email."));
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Resend Verification Email
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{status}</p>
      </div>
    </div>
  );
};

export default ResendVerificationPage;
