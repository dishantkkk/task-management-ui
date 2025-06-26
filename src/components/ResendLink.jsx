import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ResendLink = ({ identifier }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      if (identifier.includes("@")) {
        setEmail(identifier);
        setLoading(false);
      } else {
        try {
          const res = await api.get(`/auth/email-by-username?username=${identifier}`);
          setEmail(res.data.email);
        } catch {
          setEmail("");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmail();
  }, [identifier]);

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!email) return <p className="text-sm text-red-500">Could not find email for verification.</p>;

  return (
    <Link
      to={`/resend-verification?email=${email}`}
      className="text-blue-600 hover:underline text-sm"
    >
      Resend Verification Email
    </Link>
  );
};

export default ResendLink;
