import { useState } from "react";
import { login } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function useLogin() {
  const [role, setRole] = useState("doctor");
  const [email, setEmail] = useState("mohdabach130@gmail.com");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setError(null);
      setLoading(true);
      const tmpErr = {};
      if (!role.trim() || ["doctor", "asistant"].indexOf(role) === -1) {
        tmpErr.role = "Please select a valid role";
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        tmpErr.email = "Please enter a valid email";
      }
      if (!password.trim() || password.length < 2) {
        tmpErr.password = "Please enter a valid password";
      }
      setError(tmpErr);
      if (tmpErr.role || tmpErr.email || tmpErr.password) return;
      const res = await login(role, email, password, setError);

      if (res?.status === "success") {
        setUser(res.user);
      }
    } catch (err) {
      setError((prev) => ({ ...prev, err: "An error occurred" }));
    } finally {
      setLoading(false);
    }
  };

  return {
    role,
    email,
    password,
    loading,
    error,
    handleRoleChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    user,
  };
}
