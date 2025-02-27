import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupFormPage.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!username) {
      newErrors.username = "Username is required.";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    } else if (!isNaN(username)) {
      newErrors.username = "Username should not be a number.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Confirm Password must match Password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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
        navigate("/");
      }
    }
  };

  return (
    <div className="signup-form-container-page">
      <h1 className="signup-form-title-page">Sign Up</h1>
      {errors.server && <p className="signup-form-error-message">{errors.server}</p>}
      <form className="signup-form-page" onSubmit={handleSubmit}>
        <label className="signup-form-label-page">
          Email
          <input
            className="signup-form-input-page"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="signup-form-error-text-page">{errors.email}</p>}

        <label className="signup-form-label-page">
          Username
          <input
            className="signup-form-input-page"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="signup-form-error-text-page">{errors.username}</p>}

        <label className="signup-form-label-page">
          Password
          <input
            className="signup-form-input-page"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="signup-form-error-text-page">{errors.password}</p>}

        <label className="signup-form-label-page">
          Confirm Password
          <input
            className="signup-form-input-page"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="signup-form-error-text-page">{errors.confirmPassword}</p>
        )}

        <button className="signup-form-button-page" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
