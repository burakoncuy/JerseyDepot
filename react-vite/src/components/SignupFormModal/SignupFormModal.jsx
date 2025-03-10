import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm Password Validation
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
    }

    // Password Length Validation
    if (password.length < 6) {
      return setErrors({ password: "Password must be minimum 6 characters" });
    }

    // Username Length Validation
    if (username.length < 3) {
      return setErrors({ username: "Username must be minimum 3 characters" });
    }

    // Username Should Not Be a Number Validation
    if (!isNaN(username)) {
      return setErrors({ username: "Username should not be a number." });
    }

    // Email Validation
    if (!validateEmail(email)) {
      return setErrors({ email: "Please enter a valid email address" });
    }

    // Dispatch Signup Action
    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/items");
      closeModal();
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="signup-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.email && <p className="error-email">{errors.email}</p>}

        <label className="signup-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.username && <p className="error-username">{errors.username}</p>}

        <label className="signup-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.password && <p className="error-password">{errors.password}</p>}

        <label className="signup-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.confirmPassword && <p className="error-confirmpassword">{errors.confirmPassword}</p>}

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
